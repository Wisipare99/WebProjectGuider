import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { CheckCircle, Circle } from 'lucide-react';
import { db, auth } from '../firebase';
import { ref, set, onValue, push } from 'firebase/database';
import { signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';

const ProjectManagementPlatform = () => {
  const [user] = useAuthState(auth);
  const [projects, setProjects] = useState([]);
  const [newProjectName, setNewProjectName] = useState('');

  const stages = [
    "Iniciación de Ideas",
    "Planificación y Desarrollo",
    "Participación de la Comunidad",
    "Manejo de Contratiempos y Desafíos",
    "Iteración y Mejora",
    "Celebración de Hitos",
    "Análisis Post-Finalización"
  ];

  useEffect(() => {
    if (user) {
      const projectsRef = ref(db, 'projects/' + user.uid);
      onValue(projectsRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          setProjects(Object.values(data));
        } else {
          setProjects([]);
        }
      }, (error) => {
        console.error("Error fetching projects:", error);
      });
    }
  }, [user]);

  const addProject = () => {
    if (newProjectName.trim() !== '' && user) {
      const newProject = {
        name: newProjectName,
        stages: stages.map(stage => ({ name: stage, completed: false, notes: '' }))
      };
      const newProjectRef = push(ref(db, 'projects/' + user.uid));
      set(newProjectRef, newProject)
        .then(() => {
          console.log('Project added successfully');
          setNewProjectName('');
        })
        .catch((error) => {
          console.error('Error adding project: ', error);
        });
    }
  };

  const updateProject = (projectIndex, updatedProject) => {
    if (user) {
      const projectRef = ref(db, `projects/${user.uid}/${Object.keys(projects)[projectIndex]}`);
      set(projectRef, updatedProject)
        .catch((error) => {
          console.error('Error updating project: ', error);
        });
    }
  };

  const toggleStageCompletion = (projectIndex, stageIndex) => {
    const updatedProjects = [...projects];
    updatedProjects[projectIndex].stages[stageIndex].completed = !updatedProjects[projectIndex].stages[stageIndex].completed;
    updateProject(projectIndex, updatedProjects[projectIndex]);
  };

  const updateStageNotes = (projectIndex, stageIndex, notes) => {
    const updatedProjects = [...projects];
    updatedProjects[projectIndex].stages[stageIndex].notes = notes;
    updateProject(projectIndex, updatedProjects[projectIndex]);
  };

  const handleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .catch((error) => {
        console.error('Error signing in: ', error);
      });
  };

  const handleSignOut = () => {
    signOut(auth)
      .catch((error) => {
        console.error('Error signing out: ', error);
      });
  };

  if (!user) {
    return (
      <div className="p-4 text-center">
        <h1 className="text-2xl font-bold mb-4">Plataforma de Gestión de Proyectos Digitales</h1>
        <Button onClick={handleSignIn}>Iniciar sesión con Google</Button>
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Plataforma de Gestión de Proyectos Digitales</h1>
        <Button onClick={handleSignOut}>Cerrar sesión</Button>
      </div>
      <div className="flex mb-4">
        <Input 
          placeholder="Nombre del nuevo proyecto" 
          value={newProjectName} 
          onChange={(e) => setNewProjectName(e.target.value)}
          className="mr-2"
        />
        <Button onClick={addProject}>Añadir Proyecto</Button>
      </div>
      {projects.length > 0 ? (
        <Tabs defaultValue={projects[0]?.name}>
          <TabsList>
            {projects.map((project, index) => (
              <TabsTrigger key={index} value={project.name}>{project.name}</TabsTrigger>
            ))}
          </TabsList>
          {projects.map((project, projectIndex) => (
            <TabsContent key={projectIndex} value={project.name}>
              <h2 className="text-xl font-semibold mb-2">{project.name}</h2>
              {project.stages.map((stage, stageIndex) => (
                <Card key={stageIndex} className="mb-4">
                  <CardHeader className="flex flex-row items-center">
                    <Button
                      variant="ghost"
                      onClick={() => toggleStageCompletion(projectIndex, stageIndex)}
                    >
                      {stage.completed ? <CheckCircle className="mr-2" /> : <Circle className="mr-2" />}
                    </Button>
                    <span className="font-semibold">{stage.name}</span>
                  </CardHeader>
                  <CardContent>
                    <Textarea
                      placeholder="Notas y progreso..."
                      value={stage.notes}
                      onChange={(e) => updateStageNotes(projectIndex, stageIndex, e.target.value)}
                      rows={4}
                    />
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
          ))}
        </Tabs>
      ) : (
        <p>No tienes proyectos aún. ¡Crea uno para comenzar!</p>
      )}
    </div>
  );
};

export default ProjectManagementPlatform;