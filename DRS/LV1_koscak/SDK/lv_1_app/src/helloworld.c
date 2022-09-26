/*
 * Copyright (c) 2009-2012 Xilinx, Inc.  All rights reserved.
 *
 * Xilinx, Inc.
 * XILINX IS PROVIDING THIS DESIGN, CODE, OR INFORMATION "AS IS" AS A
 * COURTESY TO YOU.  BY PROVIDING THIS DESIGN, CODE, OR INFORMATION AS
 * ONE POSSIBLE   IMPLEMENTATION OF THIS FEATURE, APPLICATION OR
 * STANDARD, XILINX IS MAKING NO REPRESENTATION THAT THIS IMPLEMENTATION
 * IS FREE FROM ANY CLAIMS OF INFRINGEMENT, AND YOU ARE RESPONSIBLE
 * FOR OBTAINING ANY RIGHTS YOU MAY REQUIRE FOR YOUR IMPLEMENTATION.
 * XILINX EXPRESSLY DISCLAIMS ANY WARRANTY WHATSOEVER WITH RESPECT TO
 * THE ADEQUACY OF THE IMPLEMENTATION, INCLUDING BUT NOT LIMITED TO
 * ANY WARRANTIES OR REPRESENTATIONS THAT THIS IMPLEMENTATION IS FREE
 * FROM CLAIMS OF INFRINGEMENT, IMPLIED WARRANTIES OF MERCHANTABILITY
 * AND FITNESS FOR A PARTICULAR PURPOSE.
 *
 */

/*
 * helloworld.c: simple test application
 *
 * This application configures UART 16550 to baud rate 9600.
 * PS7 UART (Zynq) is not initialized by this application, since
 * bootrom/bsp configures it to baud rate 115200
 *
 * ------------------------------------------------
 * | UART TYPE   BAUD RATE                        |
 * ------------------------------------------------
 *   uartns550   9600
 *   uartlite    Configurable only in HW design
 *   ps7_uart    115200 (configured by bootrom/bsp)
 */

#include <stdio.h>
#include "platform.h"
#include "xparameters.h"
#include "xgpio.h"

void print(char *str);

int main()
{
    init_platform();

    XGpio switches,leds,pushs;
    int switchesValue,pushsValue;

    XGpio_Initialize(&switches,XPAR_DIP_SWITCHES_8BITS_DEVICE_ID);
    XGpio_SetDataDirection(&switches,1,0xffffffff);

    XGpio_Initialize(&leds,XPAR_LEDS_DEVICE_ID);
    XGpio_SetDataDirection(&leds,1,0x00000000);

    XGpio_Initialize(&pushs,XPAR_PUSH_DEVICE_ID);
    XGpio_SetDataDirection(&pushs,1,0xffffffff);

    while (1){
    	int i;
    	switchesValue = XGpio_DiscreteRead(&switches,1);
    	pushsValue = XGpio_DiscreteRead(&pushs,1);
    	//XGpio_DiscreteWrite(&leds,1,switchesValue);
    	if(pushsValue == 0){
			XGpio_DiscreteWrite(&leds,1,switchesValue);
		}
    	if(pushsValue == 1){
			XGpio_DiscreteWrite(&leds,1,0);
			for (i=0;i<66000000/12;i++){}
			XGpio_DiscreteWrite(&leds,1,255);
    	}
    	if(pushsValue == 2){
			XGpio_DiscreteWrite(&leds,1,0);
			for (i=0;i<66000000/12;i++){}
			XGpio_DiscreteWrite(&leds,1,1);
			for (i=0;i<66000000/12;i++){}
			XGpio_DiscreteWrite(&leds,1,2);
			for (i=0;i<66000000/12;i++){}
			XGpio_DiscreteWrite(&leds,1,4);
			for (i=0;i<66000000/12;i++){}
			XGpio_DiscreteWrite(&leds,1,8);
			for (i=0;i<66000000/12;i++){}
			XGpio_DiscreteWrite(&leds,1,16);
			for (i=0;i<66000000/12;i++){}
			XGpio_DiscreteWrite(&leds,1,32);
			for (i=0;i<66000000/12;i++){}
			XGpio_DiscreteWrite(&leds,1,64);
			for (i=0;i<66000000/12;i++){}
			XGpio_DiscreteWrite(&leds,1,128);
			for (i=0;i<66000000/12;i++){}
			XGpio_DiscreteWrite(&leds,1,255);
		}
    	if(pushsValue == 4){
			XGpio_DiscreteWrite(&leds,1,0);
			for (i=0;i<66000000/12;i++){}
			XGpio_DiscreteWrite(&leds,1,85);
		}
    	if(pushsValue == 8){
    		XGpio_DiscreteWrite(&leds,1,0);
    		for (i=0;i<66000000/12;i++){}
			XGpio_DiscreteWrite(&leds,1,85);
			for (i=0;i<66670000/12;i++){}
			XGpio_DiscreteWrite(&leds,1,170);
		}
    	//for (i=0;i<66000000/12;i++){}
    	//xil_printf("stanje sklopki %d \r\n",switchesValue);
    	//for (i=0;i<66000000/12;i++){}
    	xil_printf("stanje pusha %d \r\n",pushsValue);
    }



    //while(1){
    //	switchesValue = XGpio_DiscreteRead(&switches,1);
    //	xil_printf("Stanje x%x hex, / %d \r\n",switchesValue,switchesValue);
	//
    //}

    //print("Hello World\n\r");

    return 0;
}
