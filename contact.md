---
layout: page
title: Contact
description: Get in touch with me for collaborations, opportunities, or questions
---

<section class="contact-content">
  <div class="contact-intro">
    <h2>Get In Touch</h2>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
  </div>

  <div class="contact-form-section">
    <form class="contact-form" action="#" method="POST">
      <div class="form-group">
        <label for="name">Name</label>
        <input type="text" id="name" name="name" required>
      </div>

      <div class="form-group">
        <label for="email">Email</label>
        <input type="email" id="email" name="email" required>
      </div>

      <div class="form-group">
        <label for="subject">Subject</label>
        <input type="text" id="subject" name="subject" required>
      </div>

      <div class="form-group">
        <label for="message">Message</label>
        <textarea id="message" name="message" rows="5" required></textarea>
      </div>

      <button type="submit" class="btn btn-primary">Send Message</button>
    </form>
  </div>

  <div class="contact-info">
    <h3>Other Ways to Connect</h3>
    <div class="contact-methods">
      {% if site.author.email %}
        <div class="contact-method">
          <h4>Email</h4>
          <p><a href="mailto:{{ site.author.email }}">{{ site.author.email }}</a></p>
        </div>
      {% endif %}

      {% if site.author.github %}
        <div class="contact-method">
          <h4>GitHub</h4>
          <p><a href="https://github.com/{{ site.author.github }}" target="_blank" rel="noopener">{{ site.author.github }}</a></p>
        </div>
      {% endif %}

      {% if site.author.linkedin %}
        <div class="contact-method">
          <h4>LinkedIn</h4>
          <p><a href="https://linkedin.com/in/{{ site.author.linkedin }}" target="_blank" rel="noopener">{{ site.author.linkedin }}</a></p>
        </div>
      {% endif %}
    </div>
  </div>
</section>