from .base_agent import BaseAgent

class ConAgent(BaseAgent):

    def run(self,topic):

        prompt=f"""
You are a skilled debater.

Argue against:

{topic}

Give 3 counter arguments.
"""

        return self.get_completion(prompt)
    