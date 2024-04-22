import { ContentChildren, Directive, HostListener, QueryList } from "@angular/core";
import { KeyboardManagerItemDirective } from "./keyboard-manager-item.directive";

@Directive({
  selector: '[appKm]'
})

export class KeyboardManagerDirective {
  @ContentChildren(KeyboardManagerItemDirective) public items: QueryList<KeyboardManagerItemDirective> = null;
  // Usado para obter uma QueryList de elementos ou diretivas do conteúdo DOM. Sempre que um elemento filho é adicionado, removido ou movido, a lista de consulta será atualizada e as alterações observáveis ​​na lista de consulta emitirão um novo valor.
  @HostListener('keyup', ['$event'])

  public manageKeys(event: KeyboardEvent): void {
    switch(event.key) {
      case('ArrowUp'):
        this.moveFocus(ArrowDirection.RIGHT).focus();
        break;
      case('ArrowDown'):
        this.moveFocus(ArrowDirection.LEFT).focus();
        break;
      case('ArrowRight'):
        this.moveFocus(ArrowDirection.RIGHT).focus();
        break;
      case('ArrowLeft'):
        this.moveFocus(ArrowDirection.LEFT).focus();
        break;
    }
  }

  public moveFocus(direction: ArrowDirection): KeyboardManagerItemDirective {
    const items = this.items.toArray();
    const currentSelectIndex = items.findIndex(item => item.isFocused());
    const targetElementFocus = items[currentSelectIndex + direction]

    if(targetElementFocus) {
      return targetElementFocus;
    }

    return direction === ArrowDirection.LEFT 
      ? items[length - 1]
      : items[0]
  }

}

enum ArrowDirection {
  LEFT = -1,
  RIGHT = 1
}