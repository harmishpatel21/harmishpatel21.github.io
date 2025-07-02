import React, { useState, useEffect, useRef } from 'react';
import './App.css'
import portfolioData from './data/portfolioData.json';

function App() {
  const [terminalOutput, setTerminalOutput] = useState<React.ReactNode[]>([]);
  const [currentCommand, setCurrentCommand] = useState<string>('');
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleCommand = async (command: string) => {
    const fullCommand = command.trim();
    if (!fullCommand) {
      setTerminalOutput(prev => [...prev, <pre className="terminal-line prompt-line"><span className="prompt-username">harmish</span><span className="prompt-at">@</span><span className="prompt-hostname">archlinux</span><span className="prompt-path">:~$</span></pre>]);
      setCurrentCommand('');
      return;
    }

    setCommandHistory(prev => [...prev, fullCommand]);
    setHistoryIndex(-1);

    setTerminalOutput(prev => [...prev, <pre className="terminal-line prompt-line"><span className="prompt-username">harmish</span><span className="prompt-at">@</span><span className="prompt-hostname">archlinux</span><span className="prompt-path">:~$</span> <span className="color-yellow">{fullCommand}</span></pre>]);
    setCurrentCommand('');

    let outputContent: string | React.JSX.Element | undefined;

    // Command logic using portfolioData
    if (/^whoami$/i.test(fullCommand)) {
      outputContent = (
        <div>
          <div>Hi, I'm <span className="color-cyan">{portfolioData.data.firstName} {portfolioData.data.lastName}</span>.</div>
          <div>{portfolioData.data.headline}</div>
        </div>
      );
    } else if (/^ls skills$/i.test(fullCommand)) {
      outputContent = (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5em 1em', marginTop: 8 }}>
          {portfolioData.skills.map((skill, idx) => (
            <span key={idx} style={{ background: '#313244', color: '#A6E3A1', borderRadius: 4, padding: '2px 8px', fontWeight: 500, fontSize: '1em', marginBottom: 4 }}>{skill.name}</span>
          ))}
        </div>
      );
    } else if (/^cat experience$/i.test(fullCommand)) {
      outputContent = (
        <div>
          {portfolioData.experience.map((exp, idx) => (
            <div key={idx} style={{ marginBottom: 18 }}>
              <div style={{ fontWeight: 'bold', fontSize: '1.08em' }}>
                <span className="color-cyan">{exp.title}</span>
                {' '}@{' '}
                <span className="color-yellow">{exp.companyName}</span>
                <span className="color-gray" style={{ fontWeight: 400, fontSize: '0.95em' }}> ({exp.date}, {exp.location})</span>
              </div>
              {exp.technology && (
                <div style={{ margin: '4px 0 4px 0', display: 'flex', flexWrap: 'wrap', gap: '0.4em' }}>
                  {exp.technology.split(',').map((tech, i) => (
                    <span key={i} style={{ background: '#45475a', color: '#A6E3A1', borderRadius: 4, padding: '1px 7px', fontSize: '0.95em' }}>{tech.trim()}</span>
                  ))}
                </div>
              )}
              {exp.description && exp.description.length > 0 && (
                <ul style={{ margin: '4px 0 0 18px', color: '#CDD6F4', fontSize: '0.97em' }}>
                  {Array.isArray(exp.description)
                    ? exp.description.map((desc, i) => <li key={i}>{desc}</li>)
                    : <li>{exp.description}</li>}
                </ul>
              )}
            </div>
          ))}
        </div>
      );
    } else if (/^education$/i.test(fullCommand)) {
      outputContent = (
        <div>
          {portfolioData.education.map((edu, idx) => (
            <div key={idx} style={{ marginBottom: 18 }}>
              <div style={{ fontWeight: 'bold', fontSize: '1.08em' }}>
                <span className="color-cyan">{edu.degree}</span> in <span className="color-yellow">{edu.title}</span>
                {edu.specialization && <span> (<span className="color-magenta">{edu.specialization}</span>)</span>}
              </div>
              <div style={{ fontStyle: 'italic', color: '#89B4FA', fontSize: '1em' }}>{edu.university}</div>
              <div className="color-gray" style={{ fontSize: '0.95em' }}>{edu.location} ({edu.date})</div>
              {edu.coursework && (
                <ul style={{ margin: '4px 0 0 18px', color: '#A6E3A1', fontSize: '0.97em' }}>
                  {edu.coursework.split(',').map((cw, i) => <li key={i}>{cw.trim()}</li>)}
                </ul>
              )}
            </div>
          ))}
        </div>
      );
    } else if (/^ls projects$/i.test(fullCommand)) {
      outputContent = (
        <div>
          {portfolioData.projects.map((proj, idx) => (
            <div key={idx} style={{ marginBottom: 16 }}>
              <div><span className="color-cyan">{proj.title}</span> <span className="color-gray">[{proj.technology}]</span>
              {proj.githubURL && <div><a href={proj.githubURL} target="_blank" rel="noopener noreferrer" className="terminal-link">GitHub</a></div>}</div>
              <ul style={{ margin: '4px 0 0 18px', color: '#CDD6F4', fontSize: '0.97em' }}>
                {proj.description.map((desc, i) => <li key={i}>{desc}</li>)}
              </ul>
            </div>
          ))}
        </div>
      );
    } else if (/^contact$/i.test(fullCommand)) {
      outputContent = (
        <div>
          <div><span className="color-cyan">LinkedIn:</span> <a href={portfolioData.data.linkedin} target="_blank" rel="noopener noreferrer" className="terminal-link">{portfolioData.data.linkedin}</a></div>
          <div><span className="color-cyan">Email:</span> <a href={`mailto:${portfolioData.data.email}`} target="_blank" rel="noopener noreferrer" className="terminal-link">{portfolioData.data.email}</a></div>
          <div><span className="color-cyan">GitHub:</span> <a href={portfolioData.data.github} target="_blank" rel="noopener noreferrer" className="terminal-link">{portfolioData.data.github}</a></div>
        </div>
      );
    } else if (/^contact --linkedin$/i.test(fullCommand)) {
      outputContent = (
        <div>
          <span className="color-cyan">LinkedIn:</span> <a href={portfolioData.data.linkedin} target="_blank" rel="noopener noreferrer" className="terminal-link">{portfolioData.data.linkedin}</a>
        </div>
      );
    } else if (/^contact --email$/i.test(fullCommand)) {
      outputContent = (
        <div>
          <span className="color-cyan">Email:</span> <a href={portfolioData.data.email} target="_blank" rel="noopener noreferrer" className="terminal-link">{portfolioData.data.email}</a>
        </div>
      );
    } else if (/^contact --github$/i.test(fullCommand)) {
      outputContent = (
        <div>
          <span className="color-cyan">Github:</span> <a href={portfolioData.data.github} target="_blank" rel="noopener noreferrer" className="terminal-link">{portfolioData.data.github}</a>
        </div>
      );
    } else if (/^clear$/i.test(fullCommand)) {
      setTerminalOutput([]);
    } else if (/^help$/i.test(fullCommand)) {
      outputContent = (
        <div style={{ lineHeight: 1.7 }}>
          <div><span className="color-yellow">Available commands:</span></div>
          <div><span className="color-cyan">whoami</span>: Show your name and headline</div>
          <div><span className="color-cyan">ls skills</span>: List all skills</div>
          <div><span className="color-cyan">cat experience</span>: Show work experience</div>
          <div><span className="color-cyan">education</span>: Show education details</div>
          <div><span className="color-cyan">ls projects</span>: List all projects</div>
          <div><span className="color-cyan">contact</span>: Show LinkedIn, email, and GitHub</div>
          <div><span className="color-cyan">contact --linkedin</span>: Show only LinkedIn link</div>
          <div><span className="color-cyan">contact --email</span>: Show only email</div>
          <div><span className="color-cyan">contact --github</span>: Show only GitHub link</div>
          <div><span className="color-cyan">clear</span>: Clear the terminal</div>
          <div><span className="color-cyan">help</span>: Show this help message</div>
        </div>
      );
    } else {
      outputContent = `<span class="color-red">Command not found: ${fullCommand}</span>`;
    }

    if (outputContent) {
      if (typeof outputContent === 'string') {
        setTerminalOutput(prev => [
          ...prev,
          <pre className="terminal-line" dangerouslySetInnerHTML={{ __html: outputContent.replace(/\n/g, '<br/>') }} />,
          <div className="terminal-gap" />
        ]);
      } else {
        setTerminalOutput(prev => [
          ...prev,
          outputContent,
          <div className="terminal-gap" />
        ]);
      }
    }

    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [terminalOutput]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleCommand(currentCommand);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0 && historyIndex < commandHistory.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setCurrentCommand(commandHistory[commandHistory.length - 1 - newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setCurrentCommand(commandHistory[commandHistory.length - 1 - newIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setCurrentCommand('');
      }
    }
  };

  return (
    <div className="App">
      <div className="terminal-container" ref={terminalRef}>
        {terminalOutput.map((line, index) => (
          <div key={index}>{line}</div>
        ))}
        <div className="command-input-line" style={{position: 'relative'}}>
            <span className="prompt-username">harmish</span><span className="prompt-at">@</span><span className="prompt-hostname">archlinux</span><span className="prompt-path">:~$</span>
            <span className="typed-command">{currentCommand}</span>
            <span className="blinking-cursor" />
            <input
              type="text"
              value={currentCommand}
              onChange={(e) => setCurrentCommand(e.target.value)}
              onKeyDown={handleKeyDown}
              autoFocus
              spellCheck="false"
              className="terminal-input-field invisible-input"
              ref={inputRef}
              style={{
                position: 'absolute',
                left: 0,
                top: 0,
                width: '100%',
                height: '100%',
                opacity: 0,
                zIndex: 2,
                border: 'none',
                background: 'none',
                color: 'transparent',
                caretColor: 'transparent',
              }}
            />
        </div>
      </div>
    </div>
  )
}

export default App
