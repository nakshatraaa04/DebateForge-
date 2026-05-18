from .base_agent import BaseAgent
from backend.services.web_search import search_web

class ProAgent(BaseAgent):

    def run(self, topic):

        web_data = search_web(topic)

        prompt = f"""
You are an expert debate champion.

Topic:
{topic}

Reference Information:
{web_data}

Create arguments SUPPORTING the topic.

Rules:
- Give exactly 3 arguments
- Use logic + evidence
- Include real-world examples
- Be persuasive and confident
- Make points specific, not generic
- Keep argument strength balanced and factual
"""

        return self.get_completion(prompt)