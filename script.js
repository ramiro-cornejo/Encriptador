function selectID(id) {
  return document.getElementById(id);
}

const ui = {
  inputText: selectID("input_text"),
  outputText: selectID("output_text"),
  outputTextBox: selectID("output_text_box"),
  outputImageBox: selectID("output_image_box"),
  encryptButton: selectID("encrypt_button"),
  desencryptButton: selectID("desencrypt_button"),
  clipboardCopyButton: selectID("clipboard_copy_button"),
};

/* Establece el foco en el texto de entrada */
ui.inputText.focus();

/* Un diccionario que contiene las letras que serán reemplazadas */
var cryptoDictionary = {
  a: "ai",
  e: "enter",
  i: "imes",
  o: "ober",
  u: "ufat",
};

/**
 * Toma una cadena y un diccionario como argumentos, y devuelve una cadena donde cada
 * El carácter en la cadena original se reemplaza por el valor de la clave en el
 * diccionario que coincide con el carácter.
 */
function encrypt(text) {
  let encryptedText = "";

  for (let iLetter = 0; iLetter < text.length; iLetter++) {
    let currentLetter = text[iLetter];

    encryptedText +=
      cryptoDictionary[currentLetter] === undefined
        ? currentLetter
        : cryptoDictionary[currentLetter];
  }

  return encryptedText;
}

/**
 * Reemplaza las letras encriptadas con las letras originales
 */
function desencrypt(encryptedText) {
  let desencryptedText = encryptedText;

  for (let key in cryptoDictionary) {
    desencryptedText = desencryptedText.replaceAll(cryptoDictionary[key], key);
  }

  return desencryptedText;
}

function isBasicLowerCase(text) {
  return text.match(/^[a-z ]+$/) ? true : false;
}

/**
 * Toma una función como argumento, y si la entrada es válida, llama a la
 * función y muestra el resultado.
 * @param action - una función que toma una cadena y devuelve una cadena
 */

function setIfIsValid(action) {
  const text = ui.inputText.value;

  let isEmpty = text.trim() === "";

  let errorMessage =
    "Entrada invalida:\nEscriba en minúsculas, sin acentos y evite usar caracteres especiales";

  ui.inputText.value = isBasicLowerCase(text) ? "" : ui.inputText.value;
  ui.outputText.value = isBasicLowerCase(text) ? action(text) : errorMessage;

  if (isEmpty) {
    ui.outputImageBox.classList.remove("inactive");
  } else {
    ui.outputImageBox.classList.add("inactive");
  }

  ui.outputTextBox.style.display = isEmpty ? "none" : "flex";
}

ui.encryptButton.onclick = () => setIfIsValid(encrypt);

ui.desencryptButton.onclick = () => setIfIsValid(desencrypt);

/**
 * Copiar texto
 */
function copyToClipboard() {
  ui.outputText.select();

  const text = ui.outputText.value;
  navigator.clipboard.writeText(text).then(
    () => {
      alert("Texto copiado correctamente.");
    },
    () => {
      copyToClipboardOld();
    }
  );
}

/**
 * La función primero selecciona el texto en el área de texto, luego intenta copiarlo en
 * el portapapeles. Si falla, alerta al usuario.
 */
function copyToClipboardOld() {
  try {
    var successful = document.execCommand("copy");
    var msg = successful ? "fue satisfactoria." : "falló.";
    alert("La copia del texto " + msg);
  } catch (err) {
    alert("Ups! hubo un problema: ", err);
  }
}

ui.clipboardCopyButton.onclick = copyToClipboard;
