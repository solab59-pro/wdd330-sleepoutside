const myInfo = new URLSearchParams(window.location.search);


console.log(myInfo.get('first'));
console.log(myInfo.get('last'));
console.log(myInfo.get('phone'));
console.log(myInfo.get('email'));
console.log(myInfo.get('address'));
console.log(myInfo.get('language'));
console.log(myInfo.get('country'));

document.querySelector('#results').innerHTML = `
<p>Book of Mormon Request for ${myInfo.get('first')} ${myInfo.get('last')}</p>
<p>Phone Number : ${myInfo.get('phone')}</p>
<p>Email :  ${myInfo.get('email')} </p>
<p>Home Address : ${myInfo.get('address')} </p>
<p>Language : ${myInfo.get('language')} </p>
<p>Country : ${myInfo.get('country')} </p>
`


