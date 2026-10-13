import React, { useState } from 'react';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { Footer } from './components/Footer';
import { ACADEMIC_SUBJECTS } from './data/academicData';
import { Subject } from './types/academic';

// Pages
import { SubjectExplorer } from './pages/SubjectExplorer';
import { ModuleLearning } from './pages/ModuleLearning';
import { SlideDownloadCenter } from './pages/SlideDownloadCenter';
import { QuestionPaperBank } from './pages/QuestionPaperBank';
import { AnswerKeySolutions } from './pages/AnswerKeySolutions';
import { AssessmentCenter } from './pages/AssessmentCenter';
import { KnowledgeGraphExplorer } from './pages/KnowledgeGraphExplorer';
import { EarlyLearningMode } from './pages/EarlyLearningMode';
import { VirtualLabs } from './pages/VirtualLabs';
import { ResearchExplorer } from './pages/ResearchExplorer';
import { IndustryApplications } from './pages/IndustryApplications';
import { CareerSalaryExplorer } from './pages/CareerSalaryExplorer';
import { TeachingPlanExplorer } from './pages/TeachingPlanExplorer';
import { FacultyManagement } from './pages/FacultyManagement';

export const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('subjects');
  const [selectedSubject, setSelectedSubject] = useState<Subject>(ACADEMIC_SUBJECTS[0]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

  const handleSelectSubject = (subject: Subject) => {
    setSelectedSubject(subject);
  };

  const handleNavigateSection = (sectionId: string) => {
    setActiveSection(sectionId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col transition-colors duration-300">
      {/* Dynamic Header with Theme Selector */}
      <Header
        onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        activeSection={activeSection}
        setActiveSection={handleNavigateSection}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      <div className="flex-1 flex max-w-[1600px] w-full mx-auto">
        {/* Navigation Sidebar */}
        <Sidebar
          activeSection={activeSection}
          setActiveSection={handleNavigateSection}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        {/* Main Content Viewport */}
        <main className="flex-1 p-4 sm:p-8 lg:p-10 max-w-full overflow-hidden">
          {activeSection === 'subjects' && (
            <SubjectExplorer
              onSelectSubject={handleSelectSubject}
              onNavigateSection={handleNavigateSection}
            />
          )}

          {activeSection === 'regulations' && (
            <SubjectExplorer
              onSelectSubject={handleSelectSubject}
              onNavigateSection={handleNavigateSection}
            />
          )}

          {activeSection === 'modules' && (
            <ModuleLearning
              selectedSubject={selectedSubject}
              onSelectSubject={handleSelectSubject}
              onNavigateSection={handleNavigateSection}
            />
          )}

          {activeSection === 'notes' && (
            <ModuleLearning
              selectedSubject={selectedSubject}
              onSelectSubject={handleSelectSubject}
              onNavigateSection={handleNavigateSection}
            />
          )}

          {activeSection === 'slides' && (
            <SlideDownloadCenter />
          )}

          {activeSection === 'pyq' && (
            <QuestionPaperBank
              onNavigateSection={handleNavigateSection}
            />
          )}

          {activeSection === 'answer-keys' && (
            <AnswerKeySolutions />
          )}

          {activeSection === 'quizzes' && (
            <AssessmentCenter
              onNavigateNotes={() => handleNavigateSection('modules')}
            />
          )}

          {activeSection === 'knowledge-graph' && (
            <KnowledgeGraphExplorer
              onNavigateSection={handleNavigateSection}
            />
          )}

          {activeSection === 'games' && (
            <EarlyLearningMode
              onExitToEngineering={() => handleNavigateSection('subjects')}
            />
          )}

          {activeSection === 'simulations' && (
            <VirtualLabs
              onNavigateSection={handleNavigateSection}
            />
          )}

          {activeSection === 'research' && (
            <ResearchExplorer />
          )}

          {activeSection === 'industry' && (
            <IndustryApplications />
          )}

          {activeSection === 'careers' && (
            <CareerSalaryExplorer />
          )}

          {activeSection === 'teaching-plans' && (
            <TeachingPlanExplorer />
          )}

          {activeSection === 'faculty' && (
            <FacultyManagement />
          )}
        </main>
      </div>

      {/* Official Faculty Footer with Dynamic Local Date */}
      <Footer />
    </div>
  );
};
