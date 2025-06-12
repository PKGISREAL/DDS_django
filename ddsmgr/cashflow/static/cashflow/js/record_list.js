async function deleteRecord(id) {
    if (!confirm("Удалить эту запись?")) return;

    const csrfToken = document.querySelector('[name=csrfmiddlewaretoken]').value;

    const response = await fetch(`/api/cashflow/${id}/`, {
        method: "DELETE",
        headers: {
            "X-CSRFToken": csrfToken
        }
    });

    if (response.ok) {
        alert("Запись удалена");
        window.location.reload();
    } else {
        alert("Ошибка при удалении");
    }
}