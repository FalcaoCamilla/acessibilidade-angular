import { Component, EventEmitter, Input, OnInit, Output, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { UniqueIdService } from '../../services/unique-id/unique-id.service';

@Component({
  selector: 'app-yes-no-button-group',
  templateUrl: './yes-no-button-group.component.html',
  styleUrls: ['./yes-no-button-group.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => YesNoButtonGroupComponent) 
      //Usado quando o injection token que precisamos usar é declarado, mas ainda não definido
    }
  ]
})
export class YesNoButtonGroupComponent implements OnInit, ControlValueAccessor {
  // Por padrão, um FormGroup não sabe como enviar e receber dados para um componente criado por nós. Para que ele saiba como interagir com o nosso componente, o componente precisa implementar a interface ControlValueAccessor. Inclusive a implementação desta interface nos permite utilizar a diretiva ngModel.
  @Input() public disabled = false;
  @Input() public id: string = null;
  @Input() public value: string = null;
  @Input() public label: string = '';
  @Output() public valueChange = new EventEmitter<string>();
  // Com input e output com mesmos nomes, acrescido do sufixo Change, é possível utilizar um two-way data binding
  public options = YesNoButtonGroupOptions;
  public onChange = (value: string) => {};
  public onTouched = () => {};

  constructor(uniqueIdService: UniqueIdService) {
    this.id = uniqueIdService.generateUniqueIdWithPrefix('yes-no-button-group');
  }

  ngOnInit(): void {
  }

  public writeValue(value: string): void {
    this.value = value; 
    this.onChange(this.value);
    this.valueChange.emit(this.value)
  }

  public registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  public setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  public activate(value: string): void {
    this.writeValue(value)
  }
}

enum YesNoButtonGroupOptions {
  YES = 'yes',
  NO = 'no'
}