<h1>JWT Full Implementation</h1>

<h3>After Login you receive your Access and Refresh Token</h3>
<img src="./public/login.png"/>
<h3>Now, we can put your Access Token on auth headers</h3>
<img src="./public/headers.png"/>
<h3>With a valid Access Token, privates routes are acessible</h3>
<img src="./public/private.png"/>
<h3>When Access Token expires, will throw a error</h3>
<img src="./public/expires.png"/>
<h3>Using Refresh Token, we can get a new valid Access Token and a new Refresh Token, making the old one invalid (for security)</h3>
