from flask import Flask, jsonify, render_template, request , redirect , flash ,session, url_for
from app.ai import get_ai_reply
from app.forms import send_feedback_email

app = Flask(__name__)
app.secret_key = 'rahasia'



@app.route('/')
def index():
    return render_template('layouts/index.html')




@app.route('/kuis')
def kuis():
    return render_template('kuis/kuis.html')


@app.route('/contact', methods=['GET', 'POST'])
def contact():
    if request.method == 'POST':
        data = request.form
        name = data.get('nama')
        email = data.get('email')
        message = data.get('pesan')

        
        print("DEBUG: Data masuk ke Flask:")
        print("Nama:", name)
        print("Email:", email)
        print("Pesan:", message)

        hasil = send_feedback_email(name, email, message)
        return jsonify({"status": hasil})
    
    return render_template('contact/contact.html')



@app.route('/latihan')
def latihan():
    return render_template('latihan/belajar.html')



@app.route('/pages/<page_name>')
def pages(page_name):
    valid_pages = ['app', 'auth', 'base', 'react']
    if page_name in valid_pages:
        return render_template(f'pages/{page_name}.html')
    else:
        return "Halaman tidak ditemukan", 404


@app.route("/ai-page/ai")
def ai_page():
    return render_template('ai-page/ai-pant.html')

@app.route("/chat" , methods=['POST'])
def chat():
    user_input = request.json.get("message")
    ai_reply = get_ai_reply(user_input)
    return jsonify({"reply": ai_reply})

if __name__ == "__main__":
    app.run(debug=True)



