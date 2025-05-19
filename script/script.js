window.onload = () => {
    document.getElementById("btnContinue").addEventListener("click", (event) => {
        event.preventDefault();

        // Get input values
        const card = document.getElementById("card").value;
        const month = parseInt(document.getElementById("expiryMonth").value);
        const year = parseInt(document.getElementById("expiryYear").value);
        const cvv = document.getElementById("cvv").value;
        // Get current date and month
        const now = new Date();
        const currentMonth = now.getMonth() + 1;
        const currentYear = now.getFullYear();
        // Patterns for validating card and CVV
        const patternCard = /^5[1-5][0-9]{14}$/;
        const patternCVV = /^[\d]{3,4}$/;

        let valid = true;

        // Card number exact match
        if (!card.match(patternCard)) {
            alert("Card number must be 16 digits and start with 51–55.");
            valid = false;
        } 

        // Expiry date check
        if (!(year > currentYear || (year === currentYear && month >= currentMonth))
        ) {
            alert("Card is expired or has an invalid expiration date.");
            valid = false;
        }

        // CVV exact match
        if (!cvv.match(patternCVV)) {
            alert("CVV must be 3 or 4 digits.");
            valid = false;  
        } 



        // Working with the server
        // If the form is valid, proceed to send data to the server
        if(valid) {
            const url = "http://localhost:3000/api/payment";
            const data = {
                "master_card": card,
                "exp_year": year,
                "exp_month": month,
                "cvv_code": cvv
            };
            
            fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })
            .then((response) => {
                // Check server response
                if (response.status === 201 || response.status === 200) {
                    return response.json();
                } else if (response.status === 400) {
                    throw "Bad data was sent to the server";
                } else {
                    throw "Something went wrong";
                }
            })
            .then((resJson) => {
                // Show the message from server
                alert(resJson["message"]);
            
                // Send last 4 digits and redirect to success page
                const lastFour = card.slice(-4);
                sessionStorage.setItem("last_Four_Digits", lastFour);
                window.location.href = "success.html";
            })
            .catch((error) => {
                alert(error);
            });
        }
    });

    fetch('http://localhost:3000/api/books')
        .then(res => res.json())
        .then(data => {
            // выводим книги на страницу
            console.log(data);
        });

};