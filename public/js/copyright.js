const loadHTML = (tag, positionOfTag) => {
  let nameTag = document.getElementsByTagName(tag)[positionOfTag],
  head = document.getElementsByTagName("head")[0],
  link = document.createElement("a"),
  copy = document.createTextNode(" \u00A9"),
  fontFamily = document.createElement("link");

  fontFamily.href = "https://fonts.googleapis.com/css2?family=Audiowide&display=swap";
  fontFamily.rel = "stylesheet preload prefetch";
  fontFamily.as = "style";

  head.appendChild(fontFamily);

  link.href = "https://github.com/Husdady";
  link.target = "_blank";
  link.textContent = "Husdady";

  nameTag.textContent = "Creado por "; 
  nameTag.append(link, copy);

  Object.assign(nameTag.style, {
  textAlign: "center",
  backgroundColor: "black",
  lineHeight: 3.5,
  letterSpacing: "2px",
  color: "white",
  fontFamily: "Audiowide, systemui, sansserif",
  fontSize: "15px"
  });

  Object.assign(link.style,{
  color: "inherit",
  textDecoration: "none"
  });

  link.addEventListener("mouseenter", ()=>{
    link.style.textDecoration = "underline"
  })
  link.addEventListener("mouseleave", ()=>{
    link.style.textDecoration = "none"
  })   
}