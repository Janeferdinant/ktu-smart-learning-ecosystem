$target = "Vercel"

Add-Type @"
using System;
using System.Runtime.InteropServices;
using System.Text;

public class CredReaderVercel {
    [DllImport("advapi32.dll", EntryPoint = "CredReadW", CharSet = CharSet.Unicode, SetLastError = true)]
    public static extern bool CredRead(string target, int type, int reservedFlag, out IntPtr credentialPtr);

    [DllImport("advapi32.dll", EntryPoint = "CredFree", SetLastError = true)]
    public static extern void CredFree(IntPtr buffer);

    [StructLayout(LayoutKind.Sequential, CharSet = CharSet.Unicode)]
    public struct CREDENTIAL {
        public int Flags;
        public int Type;
        public string TargetName;
        public string Comment;
        public System.Runtime.InteropServices.ComTypes.FILETIME LastWritten;
        public int CredentialBlobSize;
        public IntPtr CredentialBlob;
        public int Persist;
        public int AttributeCount;
        public IntPtr Attributes;
        public string TargetAlias;
        public string UserName;
    }

    public static string GetSecret(string target) {
        IntPtr credPtr;
        if (CredRead(target, 1, 0, out credPtr)) {
            CREDENTIAL cred = (CREDENTIAL)Marshal.PtrToStructure(credPtr, typeof(CREDENTIAL));
            byte[] bytes = new byte[cred.CredentialBlobSize];
            Marshal.Copy(cred.CredentialBlob, bytes, 0, cred.CredentialBlobSize);
            CredFree(credPtr);
            string unicodeStr = Encoding.Unicode.GetString(bytes);
            if (unicodeStr.Length > 0 && !char.IsControl(unicodeStr[0])) {
                return unicodeStr;
            }
            return Encoding.UTF8.GetString(bytes);
        }
        return null;
    }
}
"@

$token = [CredReaderVercel]::GetSecret($target)
if ($token) {
    $token = $token.Trim("`0", " ", "`r", "`n")
    Write-Output "Authenticating as Janeferdinant via Windows Credential Manager..."
    Set-Location -Path "c:\Users\Asus\Downloads\ktu\dashboard"
    $env:VERCEL_TOKEN = $token
    & npx --yes vercel --prod --yes --token $token
} else {
    Write-Error "Vercel credential not found in Windows Credential Manager!"
    exit 1
}
