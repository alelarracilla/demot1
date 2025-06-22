# 🧱 T1 Component Library

Librería de componentes reutilizables con estilos personalizados y sistema de tracking automático de interacciones.

---

## 📦 Uso Básico

Importa los componentes que necesitas:

```tsx
import { Button, Input, Modal, Card } from "./t1-components-library/components";
```

### 🔘 Botón

```tsx
<Button variant="primary" state="default" onClick={() => alert("Hola")}>
  Enviar
</Button>
```

Props disponibles:

| Prop       | Tipo                                 | Opciones                            |
|------------|--------------------------------------|-------------------------------------|
| `variant`  | `"primary" | "secondary" | "danger"` | Estilo visual                       |
| `state`    | `"default" | "loading" | "disabled"` | Estado del botón                   |
| `icon`     | `ReactNode`                          | Icono opcional                      |

---

### ✏️ Input

```tsx
<Input label="Nombre" placeholder="Ingresa tu nombre" />
```

Props:

| Prop       | Tipo                        | Opciones             |
|------------|-----------------------------|----------------------|
| `type`     | `"text" | "email" | "password"` | Tipo de input        |
| `state`    | `"default" | "error" | "success"` | Estado de validación |
| `disabled` | `boolean`                   | Deshabilitado        |

---

### 🪟 Modal

```tsx
<Modal
  isOpen={true}
  onClose={() => setOpen(false)}
  size="medium"
  header={<div>Título</div>}
  body={<div>Contenido del modal</div>}
  footer={<Button onClick={() => setOpen(false)}>Cerrar</Button>}
/>
```

Tamaños soportados: `"small"`, `"medium"`, `"large"`

---

### 📦 Card

```tsx
<Card
  image="https://picsum.photos/600/300"
  header={<h4>Título</h4>}
  body={<p>Contenido</p>}
  footer={<span>Footer</span>}
  borderStyle="outlined"
/>
```

Estilos de borde: `"default"`, `"rounded"`, `"outlined"`

---

## 📊 Tracking automático

Todos los componentes envían automáticamente eventos a la API definida por:

```
NEXT_PUBLIC_API_URL=/api
```

Los eventos incluyen:
- Nombre del componente (`Button`, `Input`, etc.)
- Acción (`click`, `focus`, `render`, `open`)
- Variante y timestamp

---
