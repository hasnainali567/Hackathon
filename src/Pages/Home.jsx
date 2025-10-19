import React from 'react'
import { useAuth } from '../context/AuthContext'
import { FaAngleDown, FaArrowUp, FaChevronDown, FaChevronLeft } from 'react-icons/fa'
import { GoogleGenAI } from '@google/genai'
import toast from 'react-hot-toast'
import { CodeBlock } from '../components/CodeBlock'
import { Editor } from '@monaco-editor/react'
import beautify from 'js-beautify'

const Home = () => {

  const [input, setInput] = React.useState('');
  const [response, setResponse] = React.useState(null);



  function isValidIdea(text) {
    const keywords = ["app", "platform", "service", "tool", "software", "website", "ai", "startup"];
    const minWords = 4;
    return keywords.some((word) => text.toLowerCase().includes(word)) && text.split(" ").length >= minWords;
  }

  const ai = new GoogleGenAI({
    apiKey: import.meta.env.VITE_GEMINI_API_KEY,
  });

  const handlePrompt = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const idea = formData.get('prompt').trim();
    const tone = formData.get('tone');

    if (!isValidIdea(idea)) {
      toast.error("Please enter a more detailed idea related to an app, platform, or service.");
      return;
    }

    const prompt = `You are an expert AI startup assistant called PitchCraft.
Your task is to generate a startup concept response strictly in JSON format.

When given a startup idea, respond only with a valid JSON object (no extra text, no explanation).
Each key must always exist. and the landing page should be a full home page with a header, hero section, features, and footer.
Use the following structure: 

Format your response exactly like this:
{
  "startupName": "string",
  "tagline": "string",
  "colorScheme": {
    "primary": "hex",
    "secondary": "hex",
    "accent": "hex",
    "background": "hex",
    "text": "hex"
  },
  "pitch": "string",
  "landingPage": {
    "html": "string",
    "css": "string"
  },
  "logo": {
    "description": "string",
    "base64": "string or null if not possible"
  }
}

Example Input:
"I want to build an app that connects students with mentors."

Example Output:
{
  "startupName": "MentorMate",
  "tagline": "Guidance Meets Growth.",
  "colorScheme": {
    "primary": "#6366F1",
    "secondary": "#8B5CF6",
    "accent": "#22D3EE",
    "background": "#0F172A",
    "text": "#F8FAFC"
  },
  "pitch": "An AI-powered platform connecting students with mentors for personalized career guidance and learning growth.",
  "landingPage": {
    "html": "<section class='hero'><h1>MentorMate</h1><p>Guidance Meets Growth.</p><button>Find a Mentor</button></section>",
    "css": "body{background:linear-gradient(135deg,#0F172A,#1E1B4B);color:#fff;font-family:Poppins,sans-serif;text-align:center;padding:5rem;}button{background:#6366F1;border:none;padding:1rem 2rem;border-radius:8px;color:#fff;font-weight:600;cursor:pointer;}"
  },
  "logo": {
    "description": "A minimalist M-shaped logo made from two connected figures, gradient from #6366F1 to #8B5CF6 symbolizing mentorship and growth.",
    "base64": null
  }
}

Now generate a new JSON response for this idea:
"${idea}"
Tone: ${tone}`

    toast.loading("Generating your startup...", { id: "gen-startup" });
    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash-001',
      contents: prompt,
    })



    let respond = (response?.text?.replace('```json', '')?.replace('```', ''));
    respond = JSON.parse(respond);
    setResponse(respond);
    toast.success("Startup generated!", { id: "gen-startup" });
    e.target.reset();
  }




  console.log(response);



  return (
    <div className='w-full flex flex-col px-10 text-white bg-bg-secondary dark:bg-dark-bg-secondary'>
      <div className='w-full min-h-[90vh] flex flex-col items-center justify-center md:p-5'>
        <div className='h-100 flex flex-col items-center justify-center'>
          <h1 className='text-3xl md:text-4xl font-semibold text-center'>What do you want to Create ?</h1>
          <p className='text-white/50 mt-2 text-sm md:text-base text-center'>Start building with a single prompt. No coding needed.</p>
        </div>
        <form onSubmit={handlePrompt} className='w-full flex items-center justify-center mt-8 relative text-white max-w-200 border-1 border-white/20 rounded-2xl overflow-hidden'>
          <div className='bg-[#383838] flex items-center justify-between  pr-2 absolute left-4 bottom-4 rounded-lg '>
            <select name="tone" id="tone" className=' text-base p-2 outline-0 rounded-md appearance-none '>
              <option value="creative">Creative</option>
              <option value="professional">Professional</option>
              <option value="casual">Casual</option>
              <option value="funny">Funny</option>
            </select>
            <FaChevronDown />
          </div>
          <button className='absolute right-4 bottom-4 bg-white text-black p-2 rounded-full cursor-pointer'><FaArrowUp size={18} /></button>
          <textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder='Enter your idea here....' name="prompt" id="prompt" rows={4} className='resize-none  bg-[#121212] w-full   text-base p-4 px-6 outline-0 rounded-2xl' >

          </textarea>
        </form>

        <div>
          {response && (
            <div className="mt-10 w-full px-4">
              {/* Title & small info */}
              <div className="max-w-3xl mx-auto mb-6">
                <h2 className="text-3xl font-bold" style={{ color: response.colorScheme?.primary || "#fff" }}>
                  {response.startupName || "Startup"}
                </h2>
                <p className="text-gray-400 mt-2">{response.tagline}</p>
              </div>

              <Editor
                language="html"
                height="400px"
                value={beautify.html(response.landingPage?.html || "", {
                  indent_size: 2,
                  space_in_empty_paren: true,
                })}
                theme="vs-dark"
              />
              {/* Logo description */}
              <div className="max-w-3xl mx-auto mt-6 bg-white/5 p-4 rounded-lg border border-white/10">
                <h3 className="text-xl font-semibold mb-2">Logo Concept</h3>
                <p className="text-gray-300">{response.logo?.description || "No logo description provided."}</p>
                {response.logo?.base64 && (
                  <img
                    src={`data:image/png;base64,${response.logo.base64}`}
                    alt="Generated logo"
                    className="mt-4 w-32 h-32 object-contain"
                  />
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Home