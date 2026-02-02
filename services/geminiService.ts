import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { ImageResolution, ChatMessage } from "../types";

// Helper to check for API Key selection (mocked for environment if needed, but using window object as per prompt)
export const checkApiKeySelection = async (): Promise<boolean> => {
  if (typeof (window as any).aistudio?.hasSelectedApiKey === 'function') {
    return await (window as any).aistudio.hasSelectedApiKey();
  }
  return true; // Fallback if not in the specific environment, assuming env var exists
};

export const promptApiKeySelection = async (): Promise<void> => {
  if (typeof (window as any).aistudio?.openSelectKey === 'function') {
    await (window as any).aistudio.openSelectKey();
  }
};

export const generateImage = async (prompt: string, resolution: ImageResolution): Promise<string | null> => {
  try {
    // Determine model based on resolution request as per prompt guidelines
    // High quality (2K/4K) -> gemini-3-pro-image-preview
    // 1K can be either, but prompt says "Upgrade to ... if user requests high-quality".
    // Prompt feature request says "generate images ... using model gemini-3-pro-image-preview".
    // So we will use pro-image-preview for all sizes in this specific "Nano Banana Pro" feature.
    
    // Create new instance to ensure fresh key if just selected
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-image-preview',
      contents: {
        parts: [{ text: prompt }],
      },
      config: {
        imageConfig: {
          imageSize: resolution,
          aspectRatio: "1:1" // Default square
        }
      },
    });

    // Extract image
    if (response.candidates && response.candidates[0].content.parts) {
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
          return `data:image/png;base64,${part.inlineData.data}`;
        }
      }
    }
    return null;

  } catch (error) {
    console.error("Image generation failed:", error);
    throw error;
  }
};

const KESHAV_PORTFOLIO_CONTEXT = `
You are an AI assistant for Keshav Gehlot's portfolio. You are helpful, professional, and knowledgeable about Keshav's skills, experience, and projects.
Here is Keshav's profile data:

**Contact Info:**
- Name: Keshav Gehlot
- Email: gehlotkeshav.kg@gmail.com
- Phone: +91 9829445825
- Location: Jodhpur, Rajasthan
- LinkedIn: linkedin.com/in/keshav-gehlot
- GitHub: github.com/keshavgehlot

**Professional Summary:**
Computer Science student specializing in Cybersecurity, currently pursuing Certified Ethical Hacker (CEH) certification. Internships at DRDO and Palo Alto Networks. Experience in cloud security, penetration testing, and automating security tools. Associate Lead for Microsoft Learn Student Ambassadors.

**Education:**
- M.Tech (Integrated) CSE: SRM Institute of Science and Technology (7.55 CGPA).
- Cambridge AS & A Levels: Lucky International School (61.5%).
- Cambridge IGCSE: Lucky International School (75%).

**Work Experience:**
1. **State Forensic Science Laboratory (Cybersecurity Intern, July 2025 – Present):**
   - Analyzing digital evidence for cybercrime investigations (mobile/disk forensics).
   - Recovering deleted data and generating reports for law enforcement.
2. **DRDO (Cybersecurity Intern, June 2025 – July 2025):**
   - Built "Kraken", a Python-based password cracker (MD5, SHA-256).
   - Tested custom security tools for vulnerabilities in a high-security lab.
3. **Palo Alto Networks (Virtual Cybersecurity Intern, April 2025 – June 2025):**
   - Focused on enterprise-level security, network security, threat analysis, and firewall configuration.
4. **ShadowFox (Cybersecurity & UI/UX Design Intern, April 2025 – April 30, 2025):**
   - Malware analysis, web app penetration testing.
   - Designed responsive website prototype in Figma.
5. **MyCaptain (Campus Ambassador, June 2024 – October 2024):**
   - Led peer-to-peer marketing campaigns, enrolled 40 students.

**Projects:**
- **CropSenz (AI Crop Doctor):** AI app using CNN to diagnose plant diseases from leaf images.
- **Net-Watch (Network Monitoring Tool):** Python/Scapy tool for real-time device identification and bandwidth tracking.
- **Kraken (Password Cracker):** Multithreaded tool for dictionary and brute-force attacks on hashes.
- **AI Stock Predictor:** LSTM neural network for forecasting stock trends.
- **Malware Visualizer:** Forensic tool to visualize malware execution paths.
- **Air Piano:** Virtual instrument using hand tracking.

**Skills:**
- **Languages:** Python, Java, C++, JavaScript, SQL.
- **Frameworks:** TensorFlow, Keras, scikit-learn, Pandas, Scapy.
- **Cybersecurity:** Network Traffic Analysis, Penetration Testing, Malware Analysis, Vulnerability Scanning.
- **Cloud:** GCP, AWS (Foundational).
- **Design:** Figma, Photoshop, HTML, CSS.
- **OS:** Windows, Kali Linux.

**Certifications & Awards:**
- Smart India Hackathon (SIH) 2025 Finalist.
- Certified Ethical Hacker (CEH) - In Progress.
- Google Cloud Engineering Certificate - In Progress.
- Top 25 Finalist, OSSOME HACKS 2.0 Hackathon.

When answering, act as a knowledgeable guide about Keshav. If asked about something not in this list, you can say you don't have that specific information but can tell them about his known skills or projects. Keep responses concise and engaging.
`;

export const sendChatMessage = async (history: ChatMessage[], newMessage: string): Promise<string> => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    const chat = ai.chats.create({
      model: 'gemini-3-flash-preview', // Using Flash for speed/efficiency in chat
      config: {
        systemInstruction: KESHAV_PORTFOLIO_CONTEXT,
      },
      history: history.map(h => ({
        role: h.role,
        parts: [{ text: h.text }]
      }))
    });

    const result: GenerateContentResponse = await chat.sendMessage({ message: newMessage });
    return result.text || "I couldn't generate a text response.";
  } catch (error) {
    console.error("Chat failed:", error);
    return "Sorry, I encountered an error processing your request.";
  }
};