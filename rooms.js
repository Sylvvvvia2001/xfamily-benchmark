const rooms = Array.from(document.querySelectorAll(".interior"));
const links = Array.from(document.querySelectorAll(".room-links a"));
const allRoomLinks = [...links, ...document.querySelectorAll(".plan a")];

function selectRoom(id) {
  const selected = rooms.find(room => room.id === id) || rooms[0];
  for (const room of rooms) room.hidden = room !== selected;
  for (const link of links) {
    if (link.hash === "#" + selected.id) link.setAttribute("aria-current", "true");
    else link.removeAttribute("aria-current");
  }
}

selectRoom(location.hash.slice(1));
for (const link of allRoomLinks) {
  link.addEventListener("click", event => {
    if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    selectRoom(link.hash.slice(1));
    if (location.hash !== link.hash) history.pushState(null, "", link.hash);
    if (link.closest(".plan")) {
      const roomLink = links.find(item => item.hash === link.hash);
      roomLink.focus({preventScroll: true});
      document.querySelector(".section-head").scrollIntoView({block: "start"});
    }
  });
}
window.addEventListener("hashchange", () => selectRoom(location.hash.slice(1)));
