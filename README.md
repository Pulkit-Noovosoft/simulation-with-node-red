# Exercise 1
## Histogram
Clone the repository and make the histogram using utility functions in draw.js file using the data in histogram_data.js file
- Make new file histogram.js and write code there, do not modify draw.js 
- the graph should be in svg2

The histogram should look somewhat like this:
![plot](./images/histogram.png)



# Exercise 2
## Control plot
> The chart that we are making is called a
> **statistical process control chart**,
> or sometimes just short **control chart**.</br>
> It is a standard tool used by quality managers
> in a manufacturing environment for instance,
> let's assume we are producing a chocolate bar.</br>
> We should aim for a target weight of 50g,
> but we can still accept maybe everything between 48g and 52g
> often they are not going to weight each and every chocolate bar,
> instead on regular intervals they will take a batch, weigh them
> and take the average
> that average is plotted on the chart, as we are doing now
> so here we have target = 50, lower control limit = 48 and upper control limit = 52
> if an average is outside the limits it indicates an issues with the production line
> but there could be also other issues, even if all values are within the limits
> for instance if we see all values above the target, we should adjust the machine,
> because the bars are consistently too heavy.

* [This video explains the process visually.](https://www.youtube.com/watch?v=Ugcb7Vlp0Ts)
* We can divide the plot into different zones
   look [here](https://www.sixsigma-institute.org/Six_Sigma_DMAIC_Process_Control_Phase_What_Are_Control_Charts.php)
* [here](https://www.sixsigma-institute.org/Six_Sigma_DMAIC_Process_Control_Phase_SPC_Out_Of_Control.php) are 7 rules
   that you will be implementing.

> we have,</br>
> TARGET = 40</br>
> UPPER ZONE C: 40 - 41</br>
> UPPER ZONE B: 41- 42</br>
> UPPER ZONE A: 43 - 43</br>
> UCL: 43</br>
> LOWER ZONE C: 39 - 40</br>
> LOWER ZONE B: 38- 39</br>
> LOWER ZONE A: 37 - 38</br>
> LCL: 37 (edited)</br>

- Make new file control_plot.js and write code in there using the data in samples.js file
> - The final plot should look something like below 👇
![plot](./images/control_plot.png)

📌Add 7 different buttons to highlight the points been violated.

📌Add a button to clear the plot to the initial state.

>- Violation of rule 6 would look something like below 👇
![rule_6_violation](./images/rule_6_violation.png)
>🧐 Notice how violating point are highlighted in red.


