# Введение

cert-manager was originally created by Jetstack and was then donated to the CNCF Sandbox. 
Jetstack remain the primary maintainers of the project and sponsors most of its development.

Jetstack is a company focused on helping businesses build and operate modern cloud 
native infrastructure with Kubernetes, and has been involved in the ecosystem since 
the inception of the Kubernetes project.
Jetstack provides enterprise support and product enhancements for cert-manager.

Below you will find details on various scenarios we aim 
to support and that are compatible with the documentation on this website. 
Furthermore, the most applicable install methods are listed below for each of the situations [!RK[certmanager]].

# Цель работы

Below you will find details on various scenarios we aim to support and that are 
compatible with the documentation on this website. Furthermore, the most applicable 
install methods are listed below for each of the situations.

# Задание

The first thing you’ll need to configure after you’ve 
installed cert-manager is an issuer which you can then use to issue certificates.

This section documents how the different issuer types 
can be configured. You might want to read more about `Issuer` and `ClusterIssuer` resources here.

cert-manager comes with a number of built-in certificate 
issuers which are denoted by being in the `cert-manager.io` group. 
You can also install external issuers in addition to the built-in types. 
Both built-in and external issuers are treated the same and are configured similarly.

When using `ClusterIssuer` resource types, ensure you understand 
the purpose of the `Cluster Resource Namespace`; this can be a common 
source of issues for people getting started with cert-manager

# Теоретическая часть

In computer vision and image processing, Otsu's method, named after
Nobuyuki Otsu, is used to perform automatic image thresholding.
In the simplest form, the algorithm returns a single intensity threshold 
that separate pixels into two classes, foreground and background. 
This threshold is determined by minimizing intra-class intensity variance,
or equivalently, by maximizing inter-class variance.

Inlined formula $`\sigma^2_w(t)=\omega_0(t)\sigma^2_0(t)+\omega_1(t)\sigma^2_1(t)`$ into the sentence.

Otsu's method is a one-dimensional discrete analog of Fisher"s 
Discriminant Analysis, is related to Jenks optimization method, 
and is equivalent to a globally optimal k-means performed on the intensity histogram. 
The extension to multi-level thresholding was described in the original paper,
and computationally efficient implementations have since been proposed [!RK[otsu]].

```math
\omega_0(t) & =\sum_{i=0}^{t-1} p(i) \\
\omega_1(t) & =\sum_{i=t}^{L-1} p(i)
```

See application !AK[large-image-rotated].

# Практическая часть

Image fragments are grouped together based on similarity, 
but unlike standard k-means clustering and such cluster analysis methods, 
the image fragments are not necessarily disjoint. 
This block-matching algorithm is less computationally 
demanding and is useful later on in the aggregation step. 
Fragments do however have the same size.
Example picture shown in !PK[gray-square]. Code shown in !PK[inline-code].

!P[gray-square|5cm]
![Gray square asdiu asdiuah sdiuhas iduhas disuf sduigsdf g8y g79380ht4 oinsdoj d8a0so897 fw80et u](./assets/img/example.png)

!P[gray-square|5cm]
![Gray square](./assets/img/example.png)

!C[inline-code|Inlined code]
```js
console.log('Hello, World!')
```

A fragment is grouped 
if its dissimilarity with a reference fragment falls below a specified threshold. 
Diagnostic information provided in the table !TK[table].

!T[table|Table example]

|Key    |Value |
|-------|------|
|Static number | 50 |
|Random number | $$ \showcaserandomnumber $$ |


This grouping technique is called block-matching, 
it is typically used to group similar groups across different frames of a digital video, 
BM3D on the other hand may group macroblocks within a single frame. 
All image fragments in a group are then stacked to form 3D cylinder-like shapes [!RK[bm3d]].

See application !AK[large-image] and !AK[large-code].

-------------------------------
# Выводы

This is assuming that you are simulating a 1-node networked cluster. 
These instructions will let you both ssh into the simulated node 
and access the outside internet from within the simulated node.