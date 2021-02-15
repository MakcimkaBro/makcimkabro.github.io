---
layout: page
title: Контакты
permalink: /contact
comments: false
---
<style>
ul{padding:0; margin: 0;}
ul li{list-style-type: none;}
</style>

<p>Tellus integer feugiat scelerisque varius morbi enim nunc faucibus. Molestie ac feugiat sed lectus vestibulum mattis ullamcorper.</p>
<ul>
  <li><i class="fab fa-viber"></i> Viber <a href="#">Link</a></li>
  <li><i class="fab fa-whatsapp"></i> WhatsApp <a href="#">Link</a></li>
  <li><i class="fab fa-telegram-plane"></i> Telegram <a href="#">Link</a></li>
  <li><i class="fas fa-at"></i> E-Mail <a href="#">makcim.sahnenko@gmail.com</a></li>
</ul>

<form action="https://formspree.io/{{site.email}}" method="POST">    
<p class="mb-4">Please send your message to {{site.name}}. We will reply as soon as possible!</p>
<div class="form-group row">
<div class="col-md-6">
<input class="form-control" type="text" name="name" placeholder="Name*" required>
</div>
<div class="col-md-6">
<input class="form-control" type="email" name="_replyto" placeholder="E-mail Address*" required>
</div>
</div>
<textarea rows="8" class="form-control mb-3" name="message" placeholder="Message*" required></textarea>    
<input class="btn btn-dark" type="submit" value="Send">
</form>
