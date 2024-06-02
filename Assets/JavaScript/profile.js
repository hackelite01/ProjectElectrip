import { activateHeaderAnimations } from "./common/utils/animations.js"
import { getRandItem } from "./common/utils/basic.js"
import { REDIRECT_EXCEPTIONS, assignRedirectLink, getCurrentPath, redirect } from "./common/utils/urls.js"
import { auth, getUserDetails } from "./fireBase/app.js"


// Active Header Animations
activateHeaderAnimations()

// Redirect page if user is not Auth
auth.operations.then(() => {
    let user = auth.currentUser
    if (user != null) {
        getUserDetails(user.uid)
            .then((userDetail) => { // Collecting auth user details
                let role = userDetail.isAdmin ? "Bunk Manager" : "User"
                document.title = `${role} - ${user.email} | ElecTrip`
                document.querySelector(".full-name").innerHTML = userDetail.name
                document.querySelector(".email").innerHTML = userDetail.email
                document.querySelector(".account-type").innerHTML = role
                document.querySelector(".spinner").remove()
                document.querySelector(".credential").classList.add("show")
            })
            .catch(_ => redirect(REDIRECT_EXCEPTIONS[2]))
    } else assignRedirectLink(REDIRECT_EXCEPTIONS[0], getCurrentPath())
})

// Randomly choosing a background image
const imgNo = getRandItem([0, 1, 2, 3, 4, 5, 6])
document.querySelector(".top-container").style.backgroundImage = `url("../Assets/Images/backgrounds/profile/${imgNo}.webp")`