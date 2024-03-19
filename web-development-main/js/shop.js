let value = []
let name =[]
let msg = []
let cart=[]
let point=[parseInt(window.localStorage.getItem('points'))]

document.querySelectorAll('.buy').forEach(product =>{
    product.onclick = () =>{
        let B=document.getElementById(product.name).value
        if(B==="" || parseInt(B)<=0){
            alert("Please Select Quantity")
        }
        else{
            alert("Item Added To Cart")
            let A = parseInt(document.getElementById(product.name).value)
            value.push(A*product.value)
            name.push(product.name)
            let a = product.name + " = " + A + "×" + product.value+" "
            let p= parseInt(product.value)*A
            let g = A +"×"+product.name+" at cost of "+p+"$"
            cart.push(a)
            msg.push(g)
            document.getElementById("items").innerHTML=cart.join(",")
            let sum = 0;
            for (let i = 0; i < value.length; i++) {
                sum += value[i];
                document.getElementById("subtotal").innerHTML=sum+"$"
                if(0<parseInt(window.localStorage.getItem('points'))){
                    let points = parseInt(point[0])
                    document.getElementById("discount").innerHTML=(sum-(sum/100)*points)+"$" + " (by "+points + " points)"
                }
                else{
                document.getElementById("discount").innerHTML = sum+"$"+"(0 points available)"}
            }

        }

    };
});
function validateForm() {
    let x = document.forms["Registration-form"]["name"].value;
    let z = document.forms["Registration-form"]["email"].value;
    let y = document.forms["Registration-form"]["address"].value;
    let w = document.forms["Registration-form"]["telephone"].value;
    let a = document.getElementById("subtotal").innerText;
    let b = document.getElementById("discount").innerText;
    let len =document.forms["Registration-form"]["telephone"].value.length;
    if (x==='') {
        document.getElementById('pop').innerHTML
            = 'Name must be provided !';
        return false;
    }
    if (z === "") {
        document.getElementById('pop').innerHTML
            = 'email must be provided !';
        return false;
    }
    if (y === "") {
        document.getElementById('pop').innerHTML
            = 'address must be provided !';
        return false;
    }
    if (w === "") {
        document.getElementById('pop').innerHTML
            = 'Telephone number must be provided !';
        return false;
    }
    if (len <=10) {
        document.getElementById('pop').innerHTML
            = 'Telephone number must be at least 8 characters';
        return false;
    }
    if (w === "") {
        document.getElementById('pop').innerHTML
            = 'Telephone number must be provided !';
        return false;
    }
    if (a === "") {
        document.getElementById('pop').innerHTML
            = 'Cart Is Empty !';
        return false;
    }
    else {
        alert("dear "+x+" ,you have ordered "+msg+".Your Total Bill Is "+a+" After the Discount final price is "+b)
    }

}





