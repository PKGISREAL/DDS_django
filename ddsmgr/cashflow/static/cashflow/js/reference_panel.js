document.addEventListener("DOMContentLoaded", () => {
    // Добавление типа
    const typeForm = document.getElementById("add-type-form");
    typeForm?.addEventListener("submit", async (e) => {
        e.preventDefault();
        const name = typeForm.querySelector('[name="name"]').value;
        const csrf = typeForm.querySelector('[name=csrfmiddlewaretoken]').value;

        const res = await fetch("/api/types/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": csrf
            },
            body: JSON.stringify({ name })
        });

        if (res.ok) {
            alert("Тип добавлен!");
            window.location.reload();
        } else {
            alert("Ошибка при добавлении типа.");
        }
    });

    // Добавление категории
    const categoryForm = document.getElementById("add-category-form");
    categoryForm?.addEventListener("submit", async (e) => {
        e.preventDefault();
        const name = categoryForm.querySelector('[name="name"]').value;
        const type = categoryForm.querySelector('[name="type"]').value;
        const csrf = categoryForm.querySelector('[name=csrfmiddlewaretoken]').value;

        const res = await fetch("/api/categories/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": csrf
            },
            body: JSON.stringify({ name, type })
        });

        if (res.ok) {
            alert("Категория добавлена!");
            window.location.reload();
        } else {
            alert("Ошибка при добавлении категории.");
        }
    });

    // Добавление подкатегории
    const subcategoryForm = document.getElementById("add-subcategory-form");
    subcategoryForm?.addEventListener("submit", async (e) => {
        e.preventDefault();
        const name = subcategoryForm.querySelector('[name="name"]').value;
        const category = subcategoryForm.querySelector('[name="category"]').value;
        const csrf = subcategoryForm.querySelector('[name=csrfmiddlewaretoken]').value;

        const res = await fetch("/api/subcategories/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": csrf
            },
            body: JSON.stringify({ name, category })
        });

        if (res.ok) {
            alert("Подкатегория добавлена!");
            window.location.reload();
        } else {
            alert("Ошибка при добавлении подкатегории.");
        }
    });

    // Добавление статуса
    const statusForm = document.getElementById("add-status-form");
    statusForm?.addEventListener("submit", async (e) => {
        e.preventDefault();
        const name = statusForm.querySelector('[name="status_name"]').value;
        const csrf = statusForm.querySelector('[name=csrfmiddlewaretoken]').value;

        const res = await fetch("/api/statuses/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": csrf
            },
            body: JSON.stringify({ name })
        });

        if (res.ok) {
            alert("Статус добавлен!");
            window.location.reload();
        } else {
            alert("Ошибка при добавлении статуса.");
        }
    });
});

// Удаление элемента справочника
async function deleteReference(type, id) {
    if (!confirm(`Удалить элемент из "${type}" с ID=${id}?`)) return;

    const csrfToken = document.querySelector('[name=csrfmiddlewaretoken]').value;

    const res = await fetch(`/api/${type}/${id}/`, {
        method: "DELETE",
        headers: {
            "X-CSRFToken": csrfToken
        }
    });

    if (res.ok) {
        alert("Удалено успешно");
        window.location.reload();
    } else {
        alert("Ошибка при удалении");
    }
}
