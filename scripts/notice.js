//  _    _ _   _ _____  ______ _            _______ ______ _____    _______ ____             _____   _____ 
// | |  | | \ | |  __ \|  ____| |        /\|__   __|  ____|  __ \  |__   __/ __ \      /\   |  __ \ / ____|
// | |  | |  \| | |__) | |__  | |       /  \  | |  | |__  | |  | |    | | | |  | |    /  \  | |__) | |  __ 
// | |  | | . ` |  _  /|  __| | |      / /\ \ | |  |  __| | |  | |    | | | |  | |   / /\ \ |  _  /| | |_ |
// | |__| | |\  | | \ \| |____| |____ / ____ \| |  | |____| |__| |    | | | |__| |  / ____ \| | \ \| |__| |
//  \____/|_| \_|_|  \_\______|______/_/    \_\_|  |______|_____/     |_|  \____/  /_/    \_\_|  \_\\_____|
                                                                                                         
                                                                                                         


(function() {
    'use strict';
    
    const isOnion = window.location.hostname.endsWith('.onion');
    
    const styles = `
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap');
        
        #exodus-safety-indicator {
            position: fixed;
            bottom: 20px;
            right: 20px;
            width: 60px;
            height: 60px;
            background: linear-gradient(135deg, #2dd4bf, #06b6d4);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            box-shadow: 0 4px 20px rgba(45, 212, 191, 0.3);
            z-index: 10000;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            backdrop-filter: blur(10px);
            border: 2px solid rgba(255, 255, 255, 0.1);
        }
        
        #exodus-safety-indicator:hover {
            transform: scale(1.1);
            box-shadow: 0 8px 30px rgba(45, 212, 191, 0.4);
        }
        
        #exodus-safety-indicator svg {
            width: 28px;
            height: 28px;
            fill: white;
            filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
        }
        
        #exodus-safety-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            backdrop-filter: blur(8px);
            display: none;
            align-items: center;
            justify-content: center;
            z-index: 10001;
            animation: fadeIn 0.3s ease;
        }
        
        #exodus-safety-content {
            background: linear-gradient(135deg, #1f2937, #111827);
            border: 1px solid #374151;
            border-radius: 16px;
            padding: 32px;
            max-width: 500px;
            margin: 20px;
            box-shadow: 0 25px 50px rgba(0, 0, 0, 0.5);
            position: relative;
            transform: scale(0.9);
            animation: modalSlideIn 0.3s ease forwards;
        }
        
        #exodus-safety-header {
            display: flex;
            align-items: center;
            gap: 12px;
            margin-bottom: 20px;
        }
        
        #exodus-safety-header svg {
            width: 32px;
            height: 32px;
            fill: #2dd4bf;
        }
        
        #exodus-safety-title {
            color: #f9fafb;
            font-size: 24px;
            font-weight: 700;
            margin: 0;
            font-family: 'Poppins', sans-serif;
        }
        
        #exodus-safety-text {
            color: #d1d5db;
            font-size: 16px;
            line-height: 1.6;
            margin-bottom: 24px;
            font-family: 'Poppins', sans-serif;
        }
        
        #exodus-safety-warning {
            background: rgba(239, 68, 68, 0.1);
            border: 1px solid rgba(239, 68, 68, 0.2);
            border-radius: 8px;
            padding: 16px;
            margin-bottom: 24px;
            color: #fecaca;
            font-family: 'Poppins', sans-serif;
        }
        
        #exodus-safety-close {
            background: linear-gradient(135deg, #2dd4bf, #06b6d4);
            color: white;
            border: none;
            padding: 12px 24px;
            border-radius: 8px;
            cursor: pointer;
            font-size: 14px;
            font-weight: 600;
            transition: all 0.2s ease;
            width: 100%;
            font-family: 'Poppins', sans-serif;
        }
        
        #exodus-safety-close:hover {
            transform: translateY(-1px);
            box-shadow: 0 4px 12px rgba(45, 212, 191, 0.3);
        }
        
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        @keyframes modalSlideIn {
            from { 
                opacity: 0;
                transform: scale(0.9) translateY(20px);
            }
            to { 
                opacity: 1;
                transform: scale(1) translateY(0);
            }
        }
        
        @media (max-width: 768px) {
            #exodus-safety-indicator {
                width: 50px;
                height: 50px;
                bottom: 15px;
                right: 15px;
            }
            
            #exodus-safety-indicator svg {
                width: 24px;
                height: 24px;
            }
            
            #exodus-safety-content {
                margin: 15px;
                padding: 24px;
            }
        }
    `;
    
    const styleSheet = document.createElement('style');
    styleSheet.textContent = styles;
    document.head.appendChild(styleSheet);
    
    const indicator = document.createElement('div');
    indicator.id = 'exodus-safety-indicator';
    indicator.innerHTML = `
        <svg viewBox="0 0 24 24">
            <path d="M12 1L3 5V11C3 16.55 6.84 21.74 12 23C17.16 21.74 21 16.55 21 11V5L12 1ZM10 17L6 13L7.41 11.59L10 14.17L16.59 7.58L18 9L10 17Z"/>
        </svg>
    `;
    
    const modal = document.createElement('div');
    modal.id = 'exodus-safety-modal';
    
    if (isOnion) {
        modal.innerHTML = `
            <div id="exodus-safety-content">
                <div id="exodus-safety-header">
                    <svg viewBox="0 0 24 24">
                        <path d="M12 1L3 5V11C3 16.55 6.84 21.74 12 23C17.16 21.74 21 16.55 21 11V5L12 1ZM10 17L6 13L7.41 11.59L10 14.17L16.59 7.58L18 9L10 17Z"/>
                    </svg>
                    <h2 id="exodus-safety-title">EXODUS ARG - Safety Verified</h2>
                </div>
                
                <p id="exodus-safety-text">
                    ✅ You are currently on the <strong>designated ARG path</strong> for the Exodus ARG experience.
                    <br><br>
                    This safety indicator confirms you are in a controlled, fictional environment designed for the ARG narrative.
                </p>
                
                <div id="exodus-safety-warning">
                    <strong>⚠️ IMPORTANT SAFETY WARNING:</strong><br>
                    If you navigate to ANY website on the dark web that does <strong>NOT</strong> display this safety indicator in the bottom-right corner, <strong>LEAVE IMMEDIATELY</strong>. 
                    <br><br>
                    Exception: Basic files like images (.jpg, .png) or text files (.txt) are generally safe, but always exercise caution.
                    <br><br>
                    Accidentally visiting unauthorized content on the Tor network may expose you to illegal material and potential legal consequences.
                </div>
                
                <button id="exodus-safety-close">I Understand - Stay Safe</button>
            </div>
        `;
    } else {
        modal.innerHTML = `
            <div id="exodus-safety-content">
                <div id="exodus-safety-header">
                    <svg viewBox="0 0 24 24">
                        <path d="M12 1L3 5V11C3 16.55 6.84 21.74 12 23C17.16 21.74 21 16.55 21 11V5L12 1ZM10 17L6 13L7.41 11.59L10 14.17L16.59 7.58L18 9L10 17Z"/>
                    </svg>
                    <h2 id="exodus-safety-title">EXODUS ARG - Safety Verified</h2>
                </div>
                
                <p id="exodus-safety-text">
                    ✅ You are currently on the <strong>designated ARG path</strong> for the Exodus ARG experience.
                    <br><br>
                    This safety indicator confirms you are in a controlled, fictional environment designed for the ARG narrative. All content here is part of the interactive story experience.
                    <br><br>
                    Look for this indicator on all official Exodus ARG pages to ensure you're following the intended narrative path.
                </p>
                
                <button id="exodus-safety-close">Continue Experience</button>
            </div>
        `;
    }
    
    function initializeSafetySystem() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                document.body.appendChild(indicator);
                document.body.appendChild(modal);
                attachEventListeners();
            });
        } else {
            document.body.appendChild(indicator);
            document.body.appendChild(modal);
            attachEventListeners();
        }
    }
    
    function attachEventListeners() {
        const indicatorElement = document.getElementById('exodus-safety-indicator');
        const modalElement = document.getElementById('exodus-safety-modal');
        const closeButton = document.getElementById('exodus-safety-close');
        
        indicatorElement.addEventListener('click', () => {
            modalElement.style.display = 'flex';
        });
        
        closeButton.addEventListener('click', () => {
            modalElement.style.display = 'none';
        });
        
        modalElement.addEventListener('click', (e) => {
            if (e.target === modalElement) {
                modalElement.style.display = 'none';
            }
        });
        
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modalElement.style.display === 'flex') {
                modalElement.style.display = 'none';
            }
        });
    }
    
    initializeSafetySystem();
    
    console.log('%c⚠️  Only trust sites with the safety indicator!', 'color: #ef4444; font-size: 14px;');
    
})();
