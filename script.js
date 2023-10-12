document.addEventListener("DOMContentLoaded", function () {

    const listGroup = document.querySelector(".list-group");
    const memberDetails = document.getElementById("member-details");

    let data = []; // Initialize an empty array to store member data

    // Fetch data from your local server and populate the list
    function fetchAndPopulateList() {

        // Fetch member data from the server
        fetch("http://localhost:3000/members")
            .then((response) => response.json())
            .then((fetchedData) => {

                data = fetchedData;

                populateList(data);

                if (data.length > 0) {
                    displayMemberDetails(data[0]);
                }
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }