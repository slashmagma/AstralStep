import { Motion } from "@capacitor/motion";

export class StepCounter {
    private lastX: number = 0;
    private lastY: number = 0;
    private lastZ: number = 0;
    private threshold: number;
    private lastMagnitude: number;
    private steps: number;
    private tracking: boolean = false;
    private listener: any;

    constructor(threshold: number = 0.2) {
        this.threshold = threshold;
        this.lastMagnitude = 0;
        this.steps = 0;


    }

    private smoothAceleration(x: number, y: number, z: number): { x: number; y: number; z: number } {
        const alpha = 0.3; // Factor de suavizado (ajustable)
        const smoothedX = alpha * this.lastX + (1 - alpha) * x;
        const smoothedY = alpha * this.lastY + (1 - alpha) * y;
        const smoothedZ = alpha * this.lastZ + (1 - alpha) * z;

        this.lastX = smoothedX;
        this.lastY = smoothedY;
        this.lastZ = smoothedZ;

        return { x: smoothedX, y: smoothedY, z: smoothedZ };
    }
    processAceleration(x: number, y: number, z: number): number {
        // Suaviza las lecturas del acelerómetro
        const smoothed = this.smoothAceleration(x, y, z);
    
        // Calcula la magnitud del vector
        const magnitude = Math.sqrt(smoothed.x ** 2 + smoothed.y ** 2 + smoothed.z ** 2);
    
        // Establece un valor mínimo de magnitud que corresponde a un paso real
        const minMagnitudeForStep = 1.5;  // Ajusta este valor según tus pruebas
    
        // Si la magnitud es demasiado baja, lo ignoramos (movimiento muy pequeño)
        if (magnitude < minMagnitudeForStep) {
            return this.steps;  // No sumamos pasos
        }
    
        // Filtrar los movimientos laterales (en los ejes X y Y)
        const zMovementThreshold = 0.7;  // Ajusta este umbral según sea necesario
    
        // Si el movimiento es demasiado lateral (en el eje X o Y), lo ignoramos
        if (Math.abs(smoothed.x) > zMovementThreshold || Math.abs(smoothed.y) > zMovementThreshold) {
            return this.steps;  // No se cuenta el paso si el movimiento no es vertical
        }
    
        // Detecta el cambio en la magnitud (delta)
        const deltaMagnitude = Math.abs(magnitude - this.lastMagnitude);
    
        // Si el cambio en la magnitud es mayor que el umbral, contamos un paso
        if (deltaMagnitude > this.threshold) {
            this.steps++;
        }
    
        // Actualiza la última magnitud
        this.lastMagnitude = magnitude;
    
        return this.steps;
    }
    
    
    public startStepTracking(): void {
        if (!this.tracking) {
            this.listener = Motion.addListener('accel', (event) => {
                const { x, y, z } = event.acceleration;
                this.steps = this.processAceleration(x, y, z);
            });
            this.tracking = true;
        }
    }

    // Método para detener el seguimiento de pasos
    public stopStepTracking(): void {
        if (this.tracking && this.listener) {
            this.listener.remove(); // Detenemos el listener
            this.tracking = false;
        }
    }

    public getSteps(): number {
        return this.steps;
    }




}