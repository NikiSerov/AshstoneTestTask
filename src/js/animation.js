$(".card-main__text").on("mouseenter", (e) => {
  $(e.target).parents(".card").addClass("show");
});

$(".card").on("mouseleave", (e) => {
  $(e.currentTarget).addClass("hideAnim");
  setTimeout(() => {
    $(e.currentTarget).removeClass("hideAnim");
    $(e.currentTarget).removeClass("show");
  }, 850);
});
