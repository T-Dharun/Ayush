from flask import Flask, request, jsonify
from flask_cors import CORS
from crewai import Agent, Task, Process, Crew
from langchain_google_genai import ChatGoogleGenerativeAI
import json
import os
from dotenv import load_dotenv
load_dotenv()
api_key = os.getenv("API_KEY")
app = Flask(__name__)
CORS(app)

with open('./data.txt', 'r') as file:
    ayush_data = file.read()


@app.route('/process', methods=['POST'])
def process_input():
    data = request.json
    nlp = data
    user_input = data.get("input", "").strip().lower()

    # Check for common greetings and handle them directly
    if user_input in ["hello", "hi", "hey"]:
        return jsonify({'output': "Hello! How can I help you today?"})

    agent_ayush_registration = Agent(
        role = 'AYUSH Startup Registration assistant',
        goal = 'Provide accurate and helpful answers regarding AYUSH startup registration from the provided context.',
        backstory = 'You are an assistant specializing in AYUSH startup registration, with in-depth knowledge of the process and required documentation.',
        verbose = False,
        llm = ChatGoogleGenerativeAI(
            model="gemini-pro", verbose=True, temperature=0.1, google_api_key=api_key
        )
    )

    ayush_task = Task(
        description = f"Generate an accurate answer based on the user query and ensure the information is strictly derived from the provided context in the txt file: {ayush_data.strip()}. Here's the query: {nlp}",
        agent = agent_ayush_registration,
        expected_output = "Provide a clear and concise response in simple English language.",
    )

    crew = Crew(
        agents = [agent_ayush_registration],
        tasks = [ayush_task],
        verbose = False,
    )

    op = crew.kickoff()
    
    output = op  # Replace with actual output
    return jsonify({'output': output})

if __name__ == '__main__':
    app.run()
