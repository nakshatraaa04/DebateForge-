from .base_agent import BaseAgent

class JudgeAgent(BaseAgent):

    def run(self,topic,pro,con):

        prompt = f"""
You are a professional debate judge.

Your task is to critically compare BOTH sides and declare a winner.

Topic: {topic}

--- PRO ARGUMENT ---
{pro}

--- CON ARGUMENT ---
{con}

Evaluation Criteria:
1. Logical strength
2. Use of evidence/examples
3. Clarity and coherence

Instructions:
- You MUST choose ONE winner (Pro or Con)
- Do NOT default to Pro
- Do NOT say both are equal
- Prefer the side with stronger reasoning, not longer text

Output STRICTLY in this format:

Winner: Pro or Con
Reason: <2-3 concise lines explaining why>
"""

        return self.get_completion(prompt)
    

    