import os
from openai import OpenAI

def get_ai_reply(user_message, client=None):
    if client is None:
        client = OpenAI(
            base_url="https://openrouter.ai/api/v1",
            api_key=os.getenv("OPEN_ROUTER_API_KEY")  # atau langsung "sk-or-v1-..." jika belum pakai env
        )
    
    response = client.chat.completions.create(
        model="deepseek/deepseek-r1-0528-qwen3-8b:free",
        messages=[
            {
                "role": "system",
                "content":   "Kamu adalah teman ngobrol AI bernama TeknoDev Assistant. "
    "Tugasmu adalah membantu pengguna belajar coding (HTML, CSS, JavaScript, dan Python) dengan sabar, jelas, dan ramah. "
    "Jika pengguna bertanya soal pemrograman, berikan penjelasan singkat lalu contoh kode. "
    "Jika pengguna tidak spesifik, bantu arahkan dengan sopan. "
    "Jawab dalam Bahasa Indonesia kecuali diminta sebaliknya."
            },
            {
                "role": "user",
                "content": user_message
            }
        ],
        extra_headers={
            "HTTP-Referer": "http://127.0.0.1:5000",
            "X-Title": "TeknoDev"
        }
    )

    
    import pprint
    pprint.pprint(response.model_dump())

    message = response.choices[0].message.content

    if not message:
        return "Maaf, AI tidak memberikan jawaban. Coba lagi nanti."

    return message
