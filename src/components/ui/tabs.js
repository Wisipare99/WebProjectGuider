// src/components/ui/tabs.js
import React from 'react';

const Tabs = ({ children, defaultValue }) => {
  const [activeTab, setActiveTab] = React.useState(defaultValue);
  return (
    <div>
      {React.Children.map(children, (child) => {
        if (child.type === TabsList) {
          return React.cloneElement(child, { activeTab, setActiveTab });
        }
        return React.cloneElement(child, { activeTab });
      })}
    </div>
  );
};

const TabsList = ({ children, activeTab, setActiveTab }) => (
  <div className="flex">
    {React.Children.map(children, (child) =>
      React.cloneElement(child, { activeTab, setActiveTab }),
    )}
  </div>
);

const TabsTrigger = ({ value, children, activeTab, setActiveTab }) => (
  <button
    onClick={() => setActiveTab(value)}
    className={`px-4 py-2 ${activeTab === value ? 'bg-gray-300' : ''}`}
  >
    {children}
  </button>
);

const TabsContent = ({ value, children, activeTab }) =>
  activeTab === value ? <div>{children}</div> : null;

export { Tabs, TabsList, TabsTrigger, TabsContent };
export default Tabs;
