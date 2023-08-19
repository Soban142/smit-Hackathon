import { auth, db, doc, getDoc, onAuthStateChanged, signOut, setDoc, addDoc, collection, query, getDocs, ref, uploadBytesResumable, getDownloadURL, storage, updateDoc, deleteDoc, serverTimestamp, orderBy, where } from "./firebaseconfig.js";


const userProfile = document.querySelector('#userProfile');
const blogTitle = document.querySelector('#blogTitleValue');
const heroText = document.querySelector('.hero-text');
const blogContainer = document.querySelector('.blog-container');
console.log(blogContainer)
const logOutBtn = document.querySelector('#logoutBtn')

let currentUser;
let blogIdUniversal;

async function addBlogData() {
    const q = query(collection(db, "blogs"), orderBy("time", "desc"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(async (doc) => {
        console.log(doc.id, " => ", doc.data());
        const { authorId, blogTitle, blogContent, time } = doc.data();
        console.log(authorId)
        const authorData = await getBlogAuthorData(authorId);
        const { email, firstName, surName, profileImage, userName } = authorData; 

        console.log(time)

        const blog = `<div class="blogs-div mt-4">
        <div class="blog-header-div">
          <div class="img-div">
            <img src="${profileImage ? profileImage : '../assests/dummy.webp'}" alt="" class="userImage">
          </div>
          <div class="titleDiv col-md-5 ml-3">
            <h4 class="blogTitle">${blogTitle}</h4>
            <p class="text-secondary">${userName ? userName : firstName + ' ' + surName} - ${new Date(time.seconds * 1000)}</p>
          </div>
        </div>
        <div class="blog-content-div mt-3">
          <p class="blog-content">${blogContent}</p>
        </div>
        <div>
            <button class="btn text-primary" onClick ="getUserBlogs('${doc.id}')">see all from this user...</button>
        </div>
      </div>`

      const div = document.createElement('div');
      div.innerHTML = blog;
      blogContainer.appendChild(div)
    });

}

addBlogData();


// async function getUserBlogs(blogId) {

//   console.log(blogId)
  
//   // const q = query(collection(db, "blogs"), where("authorId", "==", blogId)); Panga here!
//   // const querySnapshot = await getDocs(q);
//   // querySnapshot.forEach(async (doc) => {
    
//   //     console.log(doc.id, " => ", doc.data());
//   //     const { authorId, blogTitle, blogContent, time } = doc.data();

//   //     const authorData = await getBlogAuthorData(authorId);
//   //     const { email, firstName, surName, profileImage, userName } = authorData; 

//   //     heroText.innerHTML = `All from ${userName}`

//   //     console.log(time)

//   //     const blog = `<div class="blogs-div mt-4">
//   //     <div class="blog-header-div">
//   //       <div class="img-div">
//   //         <img src="${profileImage ? profileImage : '../assests/dummy.webp'}" alt="" class="userImage">
//   //       </div>
//   //       <div class="titleDiv col-md-5 ml-3">
//   //         <h4 class="blogTitle">${blogTitle}</h4>
//   //         <p class="text-secondary">${userName ? userName : firstName + ' ' + surName} - ${new Date(time.seconds * 1000)}</p>
//   //       </div>
//   //     </div>
//   //     <div class="blog-content-div mt-3">
//   //       <p class="blog-content">${blogContent}</p>
//   //     </div>
//   //     <div>
//   //         <button class="btn text-primary" onClick ="getUserBlogs('${doc.id}')">see all from this user...</button>
//   //     </div>
//   //   </div>`

//   //   const div = document.createElement('div');
//   //   div.innerHTML = blog;
//   //   blogContainer.innerHTML = div

//   });

      
    
// }


async function getBlogAuthorData(authorId) {
  const docRef = doc(db, "users", authorId);
  const docSnap = await getDoc(docRef);
  
  if (docSnap.exists()) {
    console.log("Document data:", docSnap.data());
    return docSnap.data();
  } else {
    console.log("No such document!");
  }
}


window.getUserBlogs = getUserBlogs;
