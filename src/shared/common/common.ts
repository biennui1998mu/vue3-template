export function formatDateToShow(date) {
  const f = new Intl.DateTimeFormat("vi-VN", {
    dateStyle: "short",
    timeStyle: "long"
  })
  
  return f.format(date)
}
