import React, { useState, useEffect } from 'react';
import { Check, Shield, Info, User, Github, Mail, Linkedin } from 'lucide-react';

// AWS Security Checklist data structure
const securitySections = [
  {
    id: 'iam',
    title: 'Identity and Access Management (IAM)',
    items: [
      { id: 'iam-1', text: 'Multi-Factor Authentication (MFA) enabled for all users' },
      { id: 'iam-2', text: 'Least privilege principle implemented for all IAM roles and policies' },
      { id: 'iam-3', text: 'Regular audit of IAM policies and permissions' },
      { id: 'iam-4', text: 'Password policy enforces strong passwords' },
      { id: 'iam-5', text: 'Root account secured with hardware MFA' },
      { id: 'iam-6', text: 'IAM Access Analyzer implemented' },
      { id: 'iam-7', text: 'IAM roles used instead of long-term access keys' },
      { id: 'iam-8', text: 'Regular rotation of access keys' }
    ]
  },
  {
    id: 'network',
    title: 'Network Security',
    items: [
      { id: 'net-1', text: 'VPC flow logs enabled' },
      { id: 'net-2', text: 'Security groups restrict access to necessary ports only' },
      { id: 'net-3', text: 'Network ACLs configured as additional security layer' },
      { id: 'net-4', text: 'Public subnets minimized and properly secured' },
      { id: 'net-5', text: 'AWS Shield activated for DDoS protection' },
      { id: 'net-6', text: 'VPC endpoints used for AWS services' },
      { id: 'net-7', text: 'Transit Gateway configured with proper routing controls' }
    ]
  },
  {
    id: 'data',
    title: 'Data Protection',
    items: [
      { id: 'data-1', text: 'S3 buckets have proper access controls' },
      { id: 'data-2', text: 'S3 bucket public access blocked at account level' },
      { id: 'data-3', text: 'EBS volumes encrypted' },
      { id: 'data-4', text: 'RDS instances encrypted' },
      { id: 'data-5', text: 'Data classification strategy implemented' },
      { id: 'data-6', text: 'S3 versioning enabled for critical buckets' },
      { id: 'data-7', text: 'Secrets stored in AWS Secrets Manager or Parameter Store' },
      { id: 'data-8', text: 'KMS used for key management' }
    ]
  },
  {
    id: 'logging',
    title: 'Logging and Monitoring',
    items: [
      { id: 'log-1', text: 'CloudTrail enabled in all regions' },
      { id: 'log-2', text: 'CloudTrail logs encrypted and with integrity validation' },
      { id: 'log-3', text: 'CloudWatch alarms for suspicious activity' },
      { id: 'log-4', text: 'AWS Config enabled for resource configuration tracking' },
      { id: 'log-5', text: 'GuardDuty enabled for threat detection' },
      { id: 'log-6', text: 'Log centralization strategy implemented' },
      { id: 'log-7', text: 'Security Hub enabled for comprehensive security view' }
    ]
  },
  {
    id: 'compliance',
    title: 'Compliance and Governance',
    items: [
      { id: 'comp-1', text: 'Regular security assessments performed' },
      { id: 'comp-2', text: 'Well-defined security incident response process' },
      { id: 'comp-3', text: 'AWS Organizations used for multi-account management' },
      { id: 'comp-4', text: 'Service Control Policies (SCPs) implemented' },
      { id: 'comp-5', text: 'Compliance frameworks identified and implemented' },
      { id: 'comp-6', text: 'Regular backup and recovery testing' }
    ]
  },
  {
    id: 'compute',
    title: 'Compute Security',
    items: [
      { id: 'comp-1', text: 'EC2 instances patched regularly' },
      { id: 'comp-2', text: 'IMDSv2 required on all EC2 instances' },
      { id: 'comp-3', text: 'Lambda functions follow least privilege' },
      { id: 'comp-4', text: 'Container images scanned for vulnerabilities' },
      { id: 'comp-5', text: 'Auto scaling configured for resilience' },
      { id: 'comp-6', text: 'ECS/EKS clusters secured properly' }
    ]
  }
];

// Recommendations based on score ranges
const getRecommendations = (sectionScores) => {
  const recommendations = [];
  
  Object.entries(sectionScores).forEach(([sectionId, score]) => {
    const section = securitySections.find(s => s.id === sectionId);
    if (!section) return;
    
    const percentage = score.score / score.total * 100;
    
    if (percentage < 50) {
      recommendations.push({
        section: section.title,
        severity: 'high',
        message: `Critical: Your ${section.title} setup needs immediate attention. Consider implementing all missing controls as soon as possible.`
      });
    } else if (percentage < 75) {
      recommendations.push({
        section: section.title,
        severity: 'medium',
        message: `Warning: Your ${section.title} has some gaps. Review and address the unchecked items to improve security posture.`
      });
    } else if (percentage < 100) {
      recommendations.push({
        section: section.title,
        severity: 'low',
        message: `Good: Your ${section.title} is well configured but could be improved by addressing the remaining items.`
      });
    }
  });
  
  return recommendations;
};

// Main component
const App = () => {
  const [currentPage, setCurrentPage] = useState('checklist');
  const [checkedItems, setCheckedItems] = useState({});
  const [sectionsExpanded, setSectionsExpanded] = useState({});
  const [sectionScores, setSectionScores] = useState({});
  const [totalScore, setTotalScore] = useState({ score: 0, total: 0 });
  
  // Initialize expanded sections
  useEffect(() => {
    const initialExpandedState = {};
    securitySections.forEach(section => {
      initialExpandedState[section.id] = true;
    });
    setSectionsExpanded(initialExpandedState);
  }, []);
  
  // Calculate scores when checked items change
  useEffect(() => {
    const newSectionScores = {};
    let totalChecked = 0;
    let totalItems = 0;
    
    securitySections.forEach(section => {
      const sectionChecked = section.items.filter(item => checkedItems[item.id]).length;
      const sectionTotal = section.items.length;
      
      newSectionScores[section.id] = {
        score: sectionChecked,
        total: sectionTotal
      };
      
      totalChecked += sectionChecked;
      totalItems += sectionTotal;
    });
    
    setSectionScores(newSectionScores);
    setTotalScore({ score: totalChecked, total: totalItems });
  }, [checkedItems]);
  
  // Handle item check/uncheck
  const handleItemCheck = (itemId) => {
    setCheckedItems(prev => ({
      ...prev,
      [itemId]: !prev[itemId]
    }));
  };
  
  // Toggle section expansion
  const toggleSectionExpand = (sectionId) => {
    setSectionsExpanded(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };
  
  // Calculate percentage for progress bars
  const calculatePercentage = (score, total) => {
    return (score / total) * 100;
  };
  
  // Get color based on percentage
  const getColorByPercentage = (percentage) => {
    if (percentage < 50) return 'bg-red-500';
    if (percentage < 75) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  // Render the checklist page
  const renderChecklistPage = () => (
    <div className="w-full">
      <div className="mb-8 bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold mb-4 flex items-center">
          <Shield className="mr-2" size={24} />
          Overall Security Score
        </h2>
        <div className="flex items-center mb-2">
          <div className="w-full bg-gray-200 rounded-full h-4 mr-4">
            <div 
              className={`h-4 rounded-full ${getColorByPercentage(calculatePercentage(totalScore.score, totalScore.total))}`}
              style={{ width: `${calculatePercentage(totalScore.score, totalScore.total)}%` }}
            ></div>
          </div>
          <span className="text-xl font-bold">{Math.round(calculatePercentage(totalScore.score, totalScore.total))}%</span>
        </div>
        <div className="text-sm text-gray-600">
          {totalScore.score} of {totalScore.total} items completed
        </div>
      </div>
      
      {/* Recommendations Section */}
      <div className="mb-8 bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold mb-4 flex items-center">
          <Info className="mr-2" size={24} />
          Recommendations
        </h2>
        <div>
          {getRecommendations(sectionScores).length > 0 ? (
            getRecommendations(sectionScores).map((rec, index) => (
              <div 
                key={index} 
                className={`p-4 rounded-md mb-3 ${
                  rec.severity === 'high' ? 'bg-red-100 border-l-4 border-red-500' : 
                  rec.severity === 'medium' ? 'bg-yellow-100 border-l-4 border-yellow-500' : 
                  'bg-green-100 border-l-4 border-green-500'
                }`}
              >
                <h3 className="font-semibold">{rec.section}</h3>
                <p>{rec.message}</p>
              </div>
            ))
          ) : (
            <div className="bg-green-100 border-l-4 border-green-500 p-4 rounded-md">
              <p className="font-semibold">Excellent work!</p>
              <p>Your AWS environment has passed all security checks. Continue with regular reviews to maintain this high standard.</p>
            </div>
          )}
        </div>
      </div>
      
      {/* Checklist Sections */}
      {securitySections.map(section => (
        <div key={section.id} className="mb-6 bg-white rounded-lg shadow-md overflow-hidden">
          <div 
            className="p-4 bg-gray-50 flex justify-between items-center cursor-pointer"
            onClick={() => toggleSectionExpand(section.id)}
          >
            <h3 className="text-xl font-semibold">{section.title}</h3>
            <div className="flex items-center">
              <div className="mr-4">
                <span className="font-medium">
                  {sectionScores[section.id]?.score || 0}/{sectionScores[section.id]?.total || 0}
                </span>
              </div>
              <svg 
                className={`w-5 h-5 transition-transform ${sectionsExpanded[section.id] ? 'transform rotate-180' : ''}`} 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
          
          {sectionsExpanded[section.id] && (
            <div className="p-4 border-t">
              <div className="flex items-center mb-3">
                <div className="w-full bg-gray-200 rounded-full h-2 mr-4">
                  <div 
                    className={`h-2 rounded-full ${getColorByPercentage(
                      calculatePercentage(
                        sectionScores[section.id]?.score || 0, 
                        sectionScores[section.id]?.total || 1
                      )
                    )}`}
                    style={{ 
                      width: `${calculatePercentage(
                        sectionScores[section.id]?.score || 0, 
                        sectionScores[section.id]?.total || 1
                      )}%` 
                    }}
                  ></div>
                </div>
                <span className="text-sm font-medium">
                  {Math.round(calculatePercentage(
                    sectionScores[section.id]?.score || 0, 
                    sectionScores[section.id]?.total || 1
                  ))}%
                </span>
              </div>
              
              <ul className="space-y-2">
                {section.items.map(item => (
                  <li key={item.id} className="flex items-start">
                    <div 
                      className={`flex-shrink-0 w-6 h-6 border rounded-md mr-3 cursor-pointer flex items-center justify-center ${
                        checkedItems[item.id] ? 'bg-blue-500 border-blue-500' : 'border-gray-300'
                      }`}
                      onClick={() => handleItemCheck(item.id)}
                    >
                      {checkedItems[item.id] && <Check size={16} className="text-white" />}
                    </div>
                    <span className="text-gray-800">{item.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ))}
    </div>
  );
  
  // Render the about page
  const renderAboutPage = () => (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-semibold mb-4 flex items-center">
        <User className="mr-2" size={24} />
        About Me
      </h2>
      
      <div className="mb-6">
        <p className="mb-4">
          Hello! I'm Abdullah, a passionate cloud security professional specializing in AWS environments. 
          This tool is designed to help AWS users evaluate and improve their cloud security posture 
          through a comprehensive checklist of security best practices.
        </p>
        <p>
          Feel free to use this checklist as a starting point for securing your AWS infrastructure. 
          Remember that security is a continuous process that requires regular assessment and improvement.
        </p>
      </div>
      
      <h3 className="text-xl font-semibold mb-3">Connect with me</h3>
      <div className="space-y-3">
        <div className="flex items-center">
          <Github size={20} className="mr-3" />
          <a href="https://github.com/vm32" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
            @vm32
          </a>
        </div>
        
        <div className="flex items-center">
          <Mail size={20} className="mr-3" />
          <a href="mailto:abdullah@linux.com" className="text-blue-600 hover:underline">
            abdullah@linux.com
          </a>
        </div>
        
        <div className="flex items-center">
          <Linkedin size={20} className="mr-3" />
          <a href="https://linkedin.com/in/abdullah1337" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
            @abdullah1337
          </a>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-5xl">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-center mb-2">AWS Cloud Security Checklist</h1>
          <p className="text-center text-gray-600 mb-6">
            Evaluate and improve your AWS environment security posture
          </p>
          
          <nav className="flex border-b">
            <button
              className={`py-2 px-4 font-medium ${currentPage === 'checklist' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-600 hover:text-gray-800'}`}
              onClick={() => setCurrentPage('checklist')}
            >
              Checklist
            </button>
            <button
              className={`py-2 px-4 font-medium ${currentPage === 'about' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-600 hover:text-gray-800'}`}
              onClick={() => setCurrentPage('about')}
            >
              About
            </button>
          </nav>
        </header>
        
        <main>
          {currentPage === 'checklist' ? renderChecklistPage() : renderAboutPage()}
        </main>
        
        <footer className="mt-12 text-center text-gray-600 text-sm">
          <p>AWS Cloud Security Checklist &copy; {new Date().getFullYear()}</p>
        </footer>
      </div>
    </div>
  );
};

export default App;
