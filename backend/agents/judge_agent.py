from .base_agent import BaseAgent

class JudgeAgent(BaseAgent):

    def run(self,topic,pro,con):

        prompt=f"""
Topic:
{topic}

Pro:
{pro}

Con:
{con}

Judge who wins and explain why.
"""

        return self.get_completion(prompt)
    