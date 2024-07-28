import { fetchData } from "./libs/fetch";
import "./style.css";
import { IContactResult } from "./types/entity";

const URL = "https://v1.appbackend.io/v1/rows/3Re0ywib1FKO";

async function app() {
  const contacts = await fetchData<IContactResult>(URL);

  const cardContact = document.getElementById("card-contact");

  contacts?.data.forEach((contact) => {
    const cards = document.createElement("div");
    const titleElement = document.createElement("h1");
    const phoneElement = document.createElement("p");

    const deleteBtn = document.createElement("button");

    cards.classList.add("card");

    titleElement.textContent = contact.name;
    phoneElement.classList.add("title");
    phoneElement.textContent = contact.phone.toString();
    deleteBtn.textContent = "Delete";
    deleteBtn.style.backgroundColor = "red";

    const idContact = contact._id;

    cards?.append(titleElement, phoneElement, deleteBtn);

    if (contacts.data.length > 1) {
      deleteBtn?.addEventListener("click", async () => {
        try {
          await fetch(URL, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify([idContact]),
          });
        } catch (error) {
          console.log(error);
        } finally {
          window.location.reload();
        }
      });
    }

    cardContact?.appendChild(cards);
  });

  const inputName = document.getElementById("name") as HTMLInputElement;
  const inputPhone = document.getElementById("phone") as HTMLInputElement;
  const submitBtn = document.getElementById("submit-contact");

  submitBtn?.addEventListener("click", async () => {
    const name = inputName.value;
    const phone = inputPhone.value;

    try {
      await fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify([{ name: name, phone: phone }]),
      });
    } catch (error) {
      console.log(error);
    } finally {
      window.location.reload();
    }
  });
}

app();
