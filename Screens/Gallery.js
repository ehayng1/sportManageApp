import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Pressable,
} from "react-native";
import React, { useState, useEffect } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { AntDesign } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";
import {
  query,
  orderBy,
  doc,
  startAt,
  collection,
  updateDoc,
  arrayRemove,
  arrayUnion,
  getDocs,
} from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { db } from "../firebase";

export function Gallery() {
  const [posts, setPosts] = useState([]);
  const [id, setId] = useState();

  const getUserId = async function uploadBeforePromise() {
    const auth = getAuth();
    return new Promise(function (resolve, reject) {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          resolve(user.uid);
          setId(user.uid);
        } else {
        }
      });
    });
  };
  async function getPosts() {
    const q = query(collection(db, "Gallery"), orderBy("timestamp"));
    // console.log("Posts: ", q);
    const querySnapshot = await getDocs(q);

    let tempPosts = [];
    querySnapshot.forEach((doc) => {
      // console.log(doc.id, " => ", doc.data());
      tempPosts.push({ ...doc.data(), docId: doc.id });
    });
    console.log("Posts: ", tempPosts);
    setPosts(tempPosts);
  }

  async function likePost(docId) {
    console.log("user", id, "is liking the post...");

    let newPost = [...posts];
    let postToUpdate = newPost.find((post) => post.docId === docId);
    if (postToUpdate) {
      postToUpdate.likes = postToUpdate.likes + 1;
      postToUpdate.likedUsers = [...postToUpdate.likedUsers, id];
    }
    console.log("New post", newPost);
    setPosts(newPost);

    const docRef = doc(db, "Gallery", docId);
    await updateDoc(docRef, postToUpdate);
  }

  async function removeLike(docId) {
    // implement this
    const docRef = doc(db, "Gallery", docId);

    await updateDoc(docRef, {
      likedUsers: arrayRemove(id),
    });
  }

  useEffect(() => {
    const init = async () => {
      getUserId();
      getPosts();
    };
    init();
  }, []);
  return (
    <ScrollView>
      {posts.map((post, i) => (
        <>
          <Post
            key={post.uri}
            userName={post.userName}
            likes={post.likes}
            description={post.caption}
            isLiked={post.likedUsers.includes(id)}
            likePost={likePost}
            removeLike={removeLike}
            docId={post.docId}
            uri={post.uri}
            date={post.date}
          ></Post>
        </>
      ))}
      {/* <Post likes={30} isLiked={true}></Post>
      <Post likes={30} isLiked={false}></Post> */}
    </ScrollView>
  );
}

function Header({ src, userName, date }) {
  return (
    <View style={{ display: "flex", flexDirection: "row", margin: 15 }}>
      <EvilIcons name="user" size={45} color="black" />
      <View style={{ display: "flex", marginLeft: wp("1.5%") }}>
        <Text style={{ fontWeight: "500" }}>{userName}</Text>
        <Text
          style={{
            marginLeft: wp("0.2%"),
            marginTop: hp("0.3%"),
            color: "#505050",
          }}
        >
          {date}
        </Text>
      </View>
    </View>
  );
}

function Post({
  likes,
  description,
  isLiked,
  uri,
  userName,
  date,
  docId,
  likePost,
  removeLike,
}) {
  return (
    <View style={{ marginBottom: 15 }}>
      <Header
        src="https://img.freepik.com/premium-vector/account-icon-user-icon-vector-graphics_292645-552.jpg?w=996"
        // userName={"user101"}
        userName={userName}
        date={date}
      ></Header>
      <View>
        <Image
          style={{ width: "100%", height: hp("40%") }}
          source={{
            uri: uri,
            // uri: "https://www.hillsidebeefnwa.com/images/default.jpg",
          }}
        ></Image>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            margin: 15,
            marginBottom: 5,
            alignItems: "center",
          }}
        >
          <Text style={{ fontWeight: "600", flex: 1, fontSize: 16 }}>
            {likes} likes
          </Text>
          <Pressable
            onPress={() => (isLiked ? removeLike(docId) : likePost(docId))}
          >
            <AntDesign
              style={{ marginRight: wp("1%") }}
              name={isLiked ? "heart" : "hearto"}
              size={24}
              color={isLiked && "red"}
            />
          </Pressable>
        </View>
        <Text style={{ marginLeft: 15 }}>{description}</Text>
      </View>
    </View>
  );
}
