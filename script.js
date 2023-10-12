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

    // Function to populate the list of members
    function populateList(data) {

        // Clear the existing list
        listGroup.innerHTML = "";

        // Create a button for each member and add it to the list
        data.forEach((member) => {
            const listItem = document.createElement("button");
            listItem.className = "list-group-item list-group-item-action";
            listItem.textContent = member.name;

            // Add a click event listener to each button to display member details
            listItem.addEventListener("click", () => {
                displayMemberDetails(member);
            });

            // Append the button to the list
            listGroup.appendChild(listItem);
        });
    }

    // Function to display member details
    function displayMemberDetails(member) {

        // Display member details in the member-details element
        memberDetails.innerHTML = `
            <img src="${member.image}" alt="${member.name} Photo" height="500">
            <h3>${member.name}</h3>
            <h4>Email: ${member.email}</h4>
            <h4>Phone: ${member.phone}</h4>
            <h4>Sport: ${member.sport}</h4>
            <h4>Age: ${member.age}</h4>
            <h4>Gender: ${member.gender}</h4>

            <button type="button" class="btn btn-outline-primary btn-lg" id="edit-member">Edit</button>
            <button type="button" class="btn btn-outline-danger btn-lg" id="delete-member">Delete</button>
        `;

        // Add a click event listener to the "Edit" button
        const editButton = document.getElementById("edit-member");
        editButton.addEventListener("click", () => {
            editMember(member);
        });

        // Add a click event listener to the "Delete" button
        const deleteButton = document.getElementById("delete-member");
        deleteButton.addEventListener("click", () => {
            // Call the deleteMember function with the member's ID
            deleteMember(member.id);
        });
    }