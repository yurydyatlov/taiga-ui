import {ChangeDetectorRef} from '@angular/core';
import {watch} from '@taiga-ui/cdk';
import {TuiModeDirective} from '@taiga-ui/core/directives/mode';
import {TuiBrightness} from '@taiga-ui/core/types';
import {EMPTY, Observable} from 'rxjs';
import {map, startWith, takeUntil} from 'rxjs/operators';

export function modeFactory(
    destroy$: Observable<void>,
    changeDetectorRef: ChangeDetectorRef,
    mode: TuiModeDirective | null,
): Observable<TuiBrightness | null> {
    return (
        (mode &&
            mode.change$.pipe(
                startWith(null),
                map(() => mode.mode),
                watch(changeDetectorRef),
                takeUntil(destroy$),
            )) ||
        EMPTY
    );
}
