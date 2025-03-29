const getTagColor = (value: string) => {
  let color = "";
  switch (value?.toLowerCase()) {
    case "active":
      color = "green-inverse";
      break;
    case "deactive":
      color = "red-inverse";
      break;
    case "blocked":
      color = "red-inverse";
      break;
    case "annual fee":
      color = "green-inverse";
      break;
    case "monthly fee":
      color = "geekblue-inverse";
      break;
    case "paid":
      color = "green";
      break;
    case "refunded":
      color = "red";
      break;
    case "unpaid":
      color = "pink";
      break;
  }

  return color;
};

export default getTagColor;
