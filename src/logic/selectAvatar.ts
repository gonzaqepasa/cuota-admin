const avatarAlbion = [
  "https://firebasestorage.googleapis.com/v0/b/sodapop-9f1d7.appspot.com/o/avatar%2F0tGrbNG.png?alt=media&token=deaae41b-62de-4885-a1ce-155bebe0c12b",
  "https://firebasestorage.googleapis.com/v0/b/sodapop-9f1d7.appspot.com/o/avatar%2F4kc4Aku.png?alt=media&token=52a1bc0b-ab3e-47f1-80d7-14d3095e2fd8",
  "https://firebasestorage.googleapis.com/v0/b/sodapop-9f1d7.appspot.com/o/avatar%2F7bC9vlI.png?alt=media&token=308f4072-dbe7-4f68-b44f-e736b1224efe",
  "https://firebasestorage.googleapis.com/v0/b/sodapop-9f1d7.appspot.com/o/avatar%2FRfKqwVO.png?alt=media&token=6767b5cd-13d9-49dd-9e72-e6cf230fdb48",
  "https://firebasestorage.googleapis.com/v0/b/sodapop-9f1d7.appspot.com/o/avatar%2FbD566Za.png?alt=media&token=08784ac7-5c7f-4fd4-929f-cd5527558641",
  "https://firebasestorage.googleapis.com/v0/b/sodapop-9f1d7.appspot.com/o/avatar%2FgYJKAvr.png?alt=media&token=0782834f-6ce9-4868-a8c6-f1f1e012236e",
  "https://firebasestorage.googleapis.com/v0/b/sodapop-9f1d7.appspot.com/o/avatar%2FgZ6EEon%20(1).png?alt=media&token=e67e7867-212b-4908-a063-35c20805dbf8",
  "https://firebasestorage.googleapis.com/v0/b/sodapop-9f1d7.appspot.com/o/avatar%2FkZn7UlZ%20(1).png?alt=media&token=a0758adb-09b0-4e25-9f16-56715ceab5a2",
  "https://firebasestorage.googleapis.com/v0/b/sodapop-9f1d7.appspot.com/o/avatar%2FmrrdSKF.png?alt=media&token=4aaa63bd-01b5-4062-bc15-84ba449aeaf6",
  "https://firebasestorage.googleapis.com/v0/b/sodapop-9f1d7.appspot.com/o/avatar%2FyKQyEkt.png?alt=media&token=57b3f681-3fd3-42ad-ac36-c1c6ade62645",
];

const avatarColours = [
  "https://firebasestorage.googleapis.com/v0/b/sodapop-9f1d7.appspot.com/o/avatar%2FavatarColours%2Favatar1.svg?alt=media&token=3bb058fb-bbaf-40b9-a7cb-9d747a50386a",
  "https://firebasestorage.googleapis.com/v0/b/sodapop-9f1d7.appspot.com/o/avatar%2FavatarColours%2Favatar6.svg?alt=media&token=0f30fa13-2593-45d4-b718-2ab430be49bb",
  "https://firebasestorage.googleapis.com/v0/b/sodapop-9f1d7.appspot.com/o/avatar%2FavatarColours%2Favatar4.svg?alt=media&token=22a33718-9df7-4aa7-9cd4-fcafba8af46c",
  "https://firebasestorage.googleapis.com/v0/b/sodapop-9f1d7.appspot.com/o/avatar%2FavatarColours%2Favatar2.svg?alt=media&token=5cf6864b-ca91-4561-ac81-5da8dfabfc34",
  "https://firebasestorage.googleapis.com/v0/b/sodapop-9f1d7.appspot.com/o/avatar%2FavatarColours%2Favatar5.svg?alt=media&token=5c638433-ee1b-462d-95e9-2a3909cbcbf8",
];

export function selectAvatar(str: string | null): string {
  if (typeof str !== null) {
    if (str === "F") return avatarColours[0];
    if (str === "J") return avatarColours[1];
    if (str === "B") return avatarColours[2];
    if (str === "C") return avatarColours[3];
    return avatarColours[4];
  } else {
    return avatarColours[4];
  }

  // const index = Math.floor(Math.random() * avatarAlbion.length);
  // //   console.log(index);
  // return avatarAlbion[index];
}
