from .base_agent import BaseAgent
from backend.services.web_search import search_web

class FactCheckerAgent(BaseAgent):

    def run(self, topic, arguments):

        web_data = search_web(topic)

        prompt = f"""
You are a fact checker.

Debate Topic:
{topic}

Arguments:
{arguments}

Web Evidence:
{web_data}

Check if the arguments are factual.
Mention:
1. True claims
2. False claims
3. Misleading claims
"""

        return self.get_completion(prompt)