<?php
/**
 * 2013-05-10
 * php排序算法总结
 */
$arr = array(3,4,1,2,6,7,3,5,4,8,0,9,8,7,11,3,2);
var_dump($arr);

//升幂排序
class sort{
    /**
     * 构造方法
     * @var array 排序后的顺序
     */
    public $order = array();

    /**
     * 构造方法
     *
     * @param array $arr 传入待排序的数组
     */
    public function __construct($arr){
        //$this -> order = $this->insertsort($arr);
        //$this -> order = $this->bubblesort($arr);
        //$this -> order = $this->quicksort($arr);
        //$this -> order = $this->selectsort($arr);
        $this -> order = $this->mergesort($arr);
    }

    /**
     * 插入排序
     * 时间复杂度o(n2)
     * 空间复杂度o(1)
     * 在从后向前扫描过程中，需要反复把已排序元素逐步向后挪位，为最新元素提供插入空间
     * 1从第一个元素开始，该元素可以认为已经被排序
     * 2取出下一个元素，在已经排序的元素序列中从后向前扫描
     * 3如果该元素（已排序）大于新元素，将该元素移到下一位置
     * 4重复步骤3，直到找到已排序的元素小于或者等于新元素的位置
     * 5将新元素插入到该位置后
     * 6重复步骤2~5
     */
    private function insertsort($arr){
        foreach($arr as $k => $v){
            $i = $k - 1;
            while($i > -1 && $v < $arr[$i]){
                //$next = $arr[$i + 1]; //这里直接用$v就可以了.....$arr[$i+1]永远等于$v
                $arr[$i + 1] = $arr[$i];
                $arr[$i] = $v;
                $i--;
            }
        }
        return $arr;
    }
    /**
     * 冒泡排序
     * 时间复杂度o(n2)
     * 空间复杂度o(1)
     * 1比较相邻的元素。如果第一个比第二个大，就交换他们两个。
     * 2对每一对相邻元素作同样的工作，从开始第一对到结尾的最后一对。在这一点，最后的元素应该会是最大的数。
     * 3针对所有的元素重复以上的步骤，除了最后一个。
     * 4持续每次对越来越少的元素重复上面的步骤，直到没有任何一对数字需要比较。
     */
    private function bubblesort($arr){
        $len = count($arr);
        if($len <= 1){
            return $arr;
        }
        for($i=0;$i<$len;$i++){ //一共$len趟
            for($j =$len-1;$j>$i;$j--){ //每趟上浮一个元素
                if($arr[$i] > $arr[$j]){ //交换
                    $temp = $arr[$i];
                    $arr[$i] = $arr[$j];
                    $arr[$j] = $temp;
                }
            }
        }
        return $arr;
    }

     /**
     * 快速排序
     * 时间复杂度o(n2)
     * 空间复杂度,o(nlogn)
     * 1从数列中挑出一个元素,称为基准
     * 2重新排列数列,所有元素比基准值小的摆在基准前面,大的在后面,相同的可以在任意一边.在这个分区退出之后,该基准就处于数列的中间位置
     * 3递归地,把小于基准值元素的子树列和大于基准值元素的子数列排序
     */
    private function quicksort($arr){
        $len = count($arr);
        if($len <= 1){
            return $arr;
        }
        $k = $arr[0];
        $x = array();
        $y = array();
        for($i=1;$i<$len;$i++){
            if($arr[$i]<=$k){
                $x[] = $arr[$i];
            } else{
                $y[] = $arr[$i];
            }
        }
        $x = $this -> quicksort($x);
        $y = $this -> quicksort($y);
        return array_merge($x,array($k),$y);
    }

    /**
     * 选择排序
     * 时间复杂度o(n2)
     * 空间复杂度,o(1)
     * 1 从未排序部分找出最小值
     * 2 把最小值元素和未排序部分的首位元素交换
     * 3 把未排序部分的首位元素往后移一位
     * 4 重复1-3直到未排序部分的元素个数变成1
     */
    private function selectsort($arr){
        $len = count($arr);
        for($i=0;$i<$len;$i++){
            $key = $arr[$i]; //初始化$key,以免首位元素就是最小值得情况
            $loc = $i; //初始化最小值的位置
            for($j=$i+1;$j<$len;$j++){ //找出最小值($key)
                if($arr[$j]<$key){
                    $key = $arr[$j];
                    $loc = $j;
                }
            }
            $arr[$loc] = $arr[$i];
            $arr[$i] = $key; //最小值和首位元素交换
        }
        return $arr;
    }

    /**
     * 归并排序(2路归并)
     * 时间复杂度o(nlogn)
     * 空间复杂度,o(n)
     * 1 将相邻两个数字进行归并操作,形成n/2个长度为2的子序列
     * 2 再将相邻的两个子序列归并,形成n/4个场地为4的字序列
     * 3 依此类推,直到有序序列合并为1个为止
     */
    private function mergesort($arr){//将$arr[l..h]归并排序并存储到arr_r[l..h]
        $len = count($arr);
        if($len <= 1){
            return $arr;
        }
        $temp = array();
        $this -> mergesort_child($arr,$temp,0,$len-1);
        return $arr;
    }

    private function mergesort_child(&$arr,$temp,$first,$last){//将$arr[l..h]排序
        if($first < $last){
            $mid = floor(($first+$last)/2); //将$arr[fisrt...last]分为$arr[first..mid]和$arr[mid+1..last]
            $this -> mergesort_child($arr,$temp,$first,$mid);//将$arr左半边排序
            $this -> mergesort_child($arr,$temp,$mid+1,$last);//将$arr右半边排序
            $this -> merge($arr,$temp,$first,$mid,$last);//将$arr左右半边归并
        }

    }
    /**
     * 归并排序子函数,将已经排序好的arr[first,mid]和arr[mid+1,last]归并为arr[first..last]
     */
    private function merge(&$array,$temp,$first,$mid,$last){
        $f_first = $first;                          //记录第一个数组的开始位置
        $b_first = $mid + 1;                    //记录第二个数组的开始位置
        //合并两个数组，并记录到临时数组$temp中，其实两个数组就是$array数组的子数组，拿出来排好序后在写回去
        while($f_first <= $mid && $b_first <= $last){//将array中元素由小到大合并到temp
            if($array[$f_first] <= $array[$b_first]){
                array_push($temp, $array[$f_first]);
                $f_first++;
            }else{
                array_push($temp, $array[$b_first]);
                $b_first++;
            }
        }
        while($f_first <= $mid){ //将剩余的$array[f_first..mid]复制到$temp
            array_push($temp, $array[$f_first]);
            $f_first++;
        }
        while($b_first <= $last){//将剩余的$array[b_first..last]复制到$temp
            array_push($temp, $array[$b_first]);
            $b_first++;
        }
        //写回原来数组，$first记录开始写入的位置，防止覆盖
        for($i=0; $i<count($temp); $i++){
            $array[$first + $i] = $temp[$i];
        }
    }
}

$obj = new sort($arr);
$res = $obj -> order;
var_dump($res);
