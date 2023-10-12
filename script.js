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

    // Function to edit a member's details
    function editMember(member) {

        // Create an edit form for the member
        const editForm = document.createElement("form");
        editForm.innerHTML = `
            <h3>Edit Member Details</h3>
            <div class="form-group">
                <label for="editName">Full Name</label>
                <input type="text" class="form-control" id="editName" value="${member.name}">
            </div>
            <div class="form-group">
                <label for="editEmail">Email</label>
                <input type="email" class="form-control" id="editEmail" value="${member.email}">
            </div>
            <div class="form-group">
                <label for="editPhone">Phone Number</label>
                <input type="tel" class="form-control" id="editPhone" value="${member.phone}">
            </div>
            <div class="form-group">
                <label for="editSport">Sport</label>
                <input type="text" class="form-control" id="editSport" value="${member.sport}">
            </div>
            <div class="form-group">
                <label for="editAge">Age</label>
                <input type="number" class="form-control" id="editAge" value="${member.age}">
            </div>
            <div class="form-group">
                <label for="editGender">Gender</label>
                <input type="text" class="form-control" id="editGender" value="${member.gender}">
            </div>
            <button type="button" class="btn btn-success m-1" id="saveEdit">Save</button>
        `;

        // Append the edit form to the member-details container
        memberDetails.innerHTML = "";
        memberDetails.appendChild(editForm);

        // Add a click event listener to the "Save" button
        const saveEditButton = editForm.querySelector("#saveEdit");
        saveEditButton.addEventListener("click", () => {
            // Get the updated values from the form
            member.name = document.getElementById("editName").value;
            member.email = document.getElementById("editEmail").value;
            member.phone = document.getElementById("editPhone").value;
            member.sport = document.getElementById("editSport").value;
            member.age = document.getElementById("editAge").value;
            member.gender = document.getElementById("editGender").value;

            // Update the member's data on the server
            fetch(`http://localhost:3000/members/${member.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(member),
            })
                .then((response) => response.json())
                .then(() => {
                    // Redisplay the updated member details
                    displayMemberDetails(member);
                    // Update the list to reflect changes
                    populateList(data);
                })
                .catch((error) => {
                    console.error("Error updating data:", error);
                });
        });
    }

    // Function to delete a member
    function deleteMember(memberId) {
        // Find the member's index in the data array
        const memberIndex = data.findIndex((member) => member.id === memberId);

        if (memberIndex !== -1) {
            // Remove the member from the server
            fetch(`http://localhost:3000/members/${memberId}`, {
                method: "DELETE",
            })
                .then(() => {
                    // Remove the member from the data array
                    data.splice(memberIndex, 1);

                    // Clear the member details
                    memberDetails.innerHTML = "";

                    // Update the list to reflect the deletion
                    populateList(data);
                })
                .catch((error) => {
                    console.error("Error deleting data:", error);
                });
        }
    }

    // Event listener for the registration form
    document.querySelector("form").addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent the form from submitting in the default way

        // Get values from the form
        const name = document.getElementById("inputName").value;
        const email = document.getElementById("inputEmail4").value;
        const phone = document.getElementById("inputPhone").value;
        const sport = document.getElementById("inputSport").value;
        const age = document.getElementById("inputAge").value;
        const gender = document.getElementById("inputGender").value;
        const image = document.getElementById("inputImage").value;

        // Check if all required fields are filled
        if (name && email && phone && sport && age && gender && image) {
            const newMember = {
                name,
                email,
                phone,
                sport,
                age,
                gender,
                image,
            };

            // Add the new member to the server
            fetch("http://localhost:3000/members", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newMember),
            })
            .then((response) => response.json())
            .then((addedMember) => {
                // Add the new member to the data array
                data.push(addedMember);