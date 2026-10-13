# KTU Academic Repository Audit & Validation Report

**Generated Date:** 13 October 2026
**Audited By:** Jane Rose | Assistant Professor | Department of Computer Science and Engineering (CSE)
**Repository Scope:** APJ Abdul Kalam Technological University (KTU) Engineering Resources

---

## 1. Executive Summary

A comprehensive recursive SHA-256 audit was conducted across the raw `ktu` folder. A total of **79 academic files** were analyzed, hashed, classified, and mapped to KTU 2019 Scheme syllabus structures.

| Metric | Verified Count |
|---|---|
| **Total Academic Files Discovered** | 79 |
| **File Types** | 41 PDF, 29 PPTX, 8 PPT, 1 DOCX |
| **Identified Subjects** | 7 Distinct Engineering Subjects |
| **Exact SHA-256 Duplicate Groups** | 1 (4 redundant copies of Module 4 PDF) |
| **University Question Papers** | 12 Official Papers + 5 Model Papers |
| **University Answer Key Schemes** | 2 Official Evaluation Schemes |
| **Faculty Teaching PPT Decks** | 37 Authentic Class Slide Decks |

---

## 2. Duplicate Detection & Remediation

### Group 1: CST303 Module 4 Lecture Notes PDF
- **SHA-256 Hash:** `044326ea871fe04f...b787ae`
- **File Size:** 6,826,586 bytes (6.8 MB)
- **Duplicate Files:**
  1. `MODULE 4 (1).pdf` (Primary Retained Copy)
  2. `MODULE 4 (2).pdf` (Identical Redundant Copy)
  3. `MODULE 4 (3).pdf` (Identical Redundant Copy)
  4. `MODULE 4 (4).pdf` (Identical Redundant Copy)
- **Remediation Action:** Preserved `MODULE 4 (1).pdf` as canonical source in `subjects/cst303-computer-networks/modules/module-04/notes/`. Redundant copies cataloged in `audit-reports/duplicate-report.csv`.

---

## 3. Curated Subject Portfolios

### 1. CST303 Computer Networks (S5/S6 CSE - 4 Credits)
- **Syllabus Coverage:** Modules 1 to 5 fully mapped.
- **University Question Papers:**
  - December 2022 (B1 Series, Sets 1 & 2)
  - December 2021 (University Final Exam)
  - April 2018 & May 2019 (Previous Regular Exams)
  - Model Question Papers: Sets 1 through 5 (PCCST501 standard)
  - Second Series Question Bank & Question Sets (Q1, Q2, Q3)
- **Official Evaluation Schemes:**
  - `CST303-DRAFT SCHEME1.pdf` (Draft Scheme with question-wise answer breakdown)
  - `B2 CST303 CN QP SCHEME1-Dec 2022.pdf` (Official Valuation Scheme December 2022)
- **Specialized Lab Resources:**
  - OSPF Routing Protocol Lab Guide
  - RIPv2 Distance Vector Routing Lab Guide

### 2. CST205 Object Oriented Programming using Java (S3/S4 CSE - 4 Credits)
- **36 Authentic Lecture Presentation Decks:**
  - **Module 1 (17 PPTs):** OOP paradigm, JVM architecture, primitive types, wrapper classes, autoboxing, operators, control flow, literals, type casting, array/string/vector, class definitions, constructors, access specifiers, abstract classes, interfaces, command line args, class loaders.
  - **Module 2 (5 PPTs):** Polymorphism, method overloading, object parameters, recursion, static members, final keyword, inner classes, inheritance hierarchy, constructor execution order.
  - **Module 3 (4 PPTs):** Revised Interfaces, Exception hierarchy, checked vs unchecked exceptions, `try-catch-finally`, user-defined exceptions.
  - **Module 4 (8 PPTs):** AWT & Swing framework, MVC pattern, Swing controls (JFrame, JLabel, JButton, JTextField), Event handling mechanisms, Layout managers, Delegation Event Model, Event listener interfaces.
  - **Module 5 (1 PPT):** JDBC architecture, database drivers, SQL execution, statement objects, table creation.
- **Advanced Supplementary Guides:**
  - SOLID Principles for Module 4 OOP
  - Design Patterns Handbook

### 3. PCADT502 Robotics & Autonomous Systems (S5 - 4 Credits)
- **Module 1:** Coordinate frames, degrees of freedom, workspace, forward kinematics.

### 4. PECST521 Software Project Management (S5 - 3 Credits)
- **Module 1:** Project evaluation, step-wise planning, cost-benefit analysis.

### 5. CST305 Artificial Intelligence
- Comprehensive AI Textbook & Study Guide, NVIDIA Certified AI Operations curriculum.

### 6. CST307 Data Mining
- FP-Growth Tree frequent pattern mining notes.

### 7. Embedded Systems STM32
- Complete Mastering STM32 ARM Cortex-M architecture reference.

---

## 4. Verification Checksum
- All files have been safely mapped without loss.
- Backup manifest stored in `resource-index.json`.
- All question papers and scheme files verified for integrity.
