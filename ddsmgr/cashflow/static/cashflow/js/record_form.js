document.addEventListener("DOMContentLoaded", async () => {
    const recordId = window.RECORD_ID || null;
    const form = document.getElementById("record-form");

    const loadOptions = async (url, select, selectedId = null, displayField = "name") => {
        const response = await fetch(url);
        const data = await response.json();
        select.innerHTML = data.map(opt =>
            `<option value="${opt.id}" ${opt.id == selectedId ? 'selected' : ''}>
                ${opt[displayField]}
            </option>`
        ).join('');
    };

    const populateForm = async () => {
        let record = {};
        if (recordId) {
            const response = await fetch(`/api/cashflow/${recordId}/`);
            record = await response.json();
        }

        // Загружаем справочники
        await loadOptions("/api/statuses/", form.status, record.status);
        await loadOptions("/api/types/", form.type, record.type);
        await loadOptions("/api/categories/", form.category, record.category);
        await loadOptions("/api/subcategories/", form.subcategory, record.subcategory);

        // Заполняем поля формы при редактировании
        if (recordId) {
            form.date.value = record.date;
            form.amount.value = record.amount;
            form.comment.value = record.comment;
        }

        // Запускаем фильтрацию для связанных полей
        form.type.dispatchEvent(new Event("change"));
    };

    await populateForm();

    // Динамическая фильтрация категорий по типу
    form.type.addEventListener("change", async () => {
        const typeId = form.type.value;
        const categoriesResp = await fetch("/api/categories/");
        const allCategories = await categoriesResp.json();
        const filtered = allCategories.filter(c => c.type === parseInt(typeId));
        form.category.innerHTML = filtered.map(opt =>
            `<option value="${opt.id}">${opt.name}</option>`
        ).join('');
        form.category.dispatchEvent(new Event("change"));
    });

    // Динамическая фильтрация подкатегорий по категории
    form.category.addEventListener("change", async () => {
        const categoryId = form.category.value;
        const subcategoriesResp = await fetch("/api/subcategories/");
        const allSubcategories = await subcategoriesResp.json();
        const filtered = allSubcategories.filter(s => s.category === parseInt(categoryId));
        form.subcategory.innerHTML = filtered.map(opt =>
            `<option value="${opt.id}">${opt.name}</option>`
        ).join('');
    });

    // Обработка отправки формы
    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        const body = {};
        formData.forEach((v, k) => body[k] = v);

        const method = recordId ? "PUT" : "POST";
        const url = recordId ? `/api/cashflow/${recordId}/` : "/api/cashflow/";

        const response = await fetch(url, {
            method: method,
            headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": form.querySelector('[name="csrfmiddlewaretoken"]').value
            },
            body: JSON.stringify(body),
        });

        if (response.ok) {
            alert(recordId ? "Запись обновлена!" : "Запись создана!");
            window.location.href = "/";
        } else {
            alert("Ошибка при сохранении");
        }
    });
});