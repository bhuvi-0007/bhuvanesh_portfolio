import React from 'react';
import emailjs from 'emailjs-com';
import ShareLocationIcon from '@mui/icons-material/ShareLocation';
import MarkunreadIcon from '@mui/icons-material/Markunread';
import PhoneIcon from '@mui/icons-material/Phone';

const Contact = () => {
    const onSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }
        const formData = new FormData(form);
        const templateParams = {
            from_name: formData.get('name'),
            from_email: formData.get('email'),
            to_email: 'bhuvanesh101999@gmail.com', 
            subject: formData.get('subject'),
            message_html: formData.get('content')
        };

        emailjs.send('service_8z0zc2u', 'template_qbgtvs6', templateParams, 'dF5mF97_duY0XdCJh')
            .then((response) => {
                console.log('Email sent!', response.status, response.text);
                // Reset form or show success message
                form.reset();
            }, (error) => {
                console.error('Email failed to send!', error);
                // Handle error scenario
            });
    };

    return (
        <section id='contact'>
            <div className='contact-wrapper'>
            <div class="head">
                    <h5>CONTACT</h5>
                </div>
                <div class="sub-head">
                    <h2>I'd Love To Hear From You</h2>
                    <h3>Feel free to Contact Me:</h3>
                </div>
                <form className="contact-form" onSubmit={onSubmit}>
                    <div className="form-group">
                        <input name="name" type="text" placeholder="Name" className="contact-input" required />
                    </div>
                    <div className="form-group">
                        <input name="email" type="email" placeholder="Email" className="contact-input" required pattern="^\S+@\S+$" />
                    </div>
                    <div className="form-group">
                        <input name="subject" type="text" placeholder="Subject" className="contact-input" required />
                    </div>
                    <div className="form-area">
                        <textarea name="content" placeholder="Message" className="contact-input" required></textarea>
                    </div>
                    <button type="submit" className="contact-button">Submit</button>
                </form>
                <div className="contact-dashboard">
                <div className="contact-card">
                <ShareLocationIcon sx={{fontSize:60,color:'white'}}/>
                <h3 style={{"color":"#CC005F"}}>Find Me @</h3>
                <p>Chennai,Tamil Nadu</p>
                <p>600089, India</p>
                </div>
                <div className="contact-card">
                <MarkunreadIcon sx={{fontSize:60,color:'white'}}/>
                <h3 style={{"color":"#CC005F"}}>Mail Me @</h3>
                <p>bhuvanesh101999@gmail.com</p>
                </div>
                <div className="contact-card">
                <PhoneIcon sx={{fontSize:60,color:'white'}}/>
                <h3 style={{"color":"#CC005F"}}>Contact Me @</h3>
                <p>Phone: Telegram (<a style={{"color":"#CC005F"}} target="_blank" href='https://t.me/bhuvanesh0910' >bhuvi</a>)</p>
                </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
