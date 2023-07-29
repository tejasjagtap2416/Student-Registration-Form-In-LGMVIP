var form = document.querySelector("#userForm");
const allUsersData = [];


const resetForm = function() {
    form.classList.remove('was-validated')
    const name = document.getElementById('name');
    name.value = "";

    const email = document.getElementById('email');
    email.value = "";

    const website = document.getElementById('website');
    website.value = "";

    const image = document.getElementById('image');
    image.value = "";

    const genderEl = document.querySelectorAll('input[name="gender"]');
    for (const rb of genderEl) {
        rb.checked = false;
    }

    const BranchEl = document.querySelectorAll('input[name="Branch"]');
    for (const rb of BranchEl) {
        rb.checked = false;
    }
};



const getData = function() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const website = document.getElementById('website').value;
    const image = document.getElementById('image').value;
    let gender;
    let Branch = [];

    const genderEl = document.querySelectorAll('input[name="gender"]');
    for (const rb of genderEl) {
        if (rb.checked) {
            gender = rb.value;
            break;
        }
    };

    const BranchEl = document.querySelectorAll('input[name="Branch"]');
    for (const rb of BranchEl) {
        if (rb.checked) {
            Branch.push(rb.value);
        }
    }
    return { name, email, website, image, gender, Branch };
};



form.addEventListener("submit", function(event) {
    event.preventDefault();
    if (form.checkValidity()) {
        const data = getData();
        allUsersData.push(data);
        printResult(data);
        resetForm();


    } else {
        form.classList.add('was-validated');
    };
    removeSpan();
});



function removeSpan() {
    var span = document.getElementById("span");
    if (span) {
        span.remove();
    }

};



function printResult(data) {
    const resultEl = document.getElementById('enrolled-students');
    let sectionHeading = null;
    if (allUsersData.length == 1) {

        sectionHeading = document.createElement('div');
        const description = document.createElement('p');
        description.innerHTML = "Description";
        description.className = "description";

        const image = document.createElement('p');
        image.innerHTML = "Image"
        image.className = "Image";

        sectionHeading.className = "sectionHeading";
        sectionHeading.append(description, image);
    };

    const wrapper = document.createElement('div');
    wrapper.className = "wrapper";
    wrapper.addEventListener('click', function(e) {
        console.log(e.target.className);
        if (e.target.className.includes('userDeleteBtn')) {
            console.log('aaadfasdfasdf');
            e.currentTarget.remove();
        }

    });

    const deleteBtn = document.createElement('button');
    deleteBtn.innerHTML = "+";
    deleteBtn.className = "userDeleteBtn";

    const textInfoContainer = document.createElement('div');
    textInfoContainer.className = "textInfoContainer";

    const imageContainer = document.createElement('div');
    imageContainer.className = "imageContainer";

    const imageHyperlink = document.createElement('a');
    imageHyperlink.href = data.image;
    imageHyperlink.target = "_blank";


    let name = document.createElement('p');
    name.className = "infoText userName";
    name.innerHTML = data.name;

    let gender = document.createElement('p');
    gender.className = "infoText gender";
    gender.innerHTML = data.gender;

    let email = document.createElement('p');
    email.className = "infoText email";
    email.innerHTML = data.email;

    let website = document.createElement('a');
    website.className = "infoText website";
    website.innerHTML = data.website;
    website.href = data.website;
    website.target = "_blank";

    let Branch = document.createElement('p');
    Branch.className = "infoText Branch";
    Branch.innerHTML = data.Branch.join(', ');


    let userImage = document.createElement('img');
    userImage.className = "userImage";
    userImage.src = data.image;


    textInfoContainer.append(name, gender, email, website, Branch);
    imageHyperlink.appendChild(userImage);
    imageContainer.appendChild(imageHyperlink);

    wrapper.append(textInfoContainer, imageContainer, deleteBtn);

    if (sectionHeading == null) {
        resultEl.append(wrapper);
    } else {
        resultEl.append(sectionHeading, wrapper)
    };

};