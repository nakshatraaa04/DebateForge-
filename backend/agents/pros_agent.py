from .base_agent import BaseAgent

class ProAgent(BaseAgent):

    def run(self,topic):

        prompt=f"""
You are a skilled debater.

Argue in favor of:

{topic}

Give 3 strong arguments.
"""

        return self.get_completion(prompt)
    