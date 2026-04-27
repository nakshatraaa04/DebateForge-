class BaseAgent:

    def __init__(self,llm):
        self.llm = llm

    def get_completion(self,prompt):
        response = self.llm.invoke(prompt)
        return response.content